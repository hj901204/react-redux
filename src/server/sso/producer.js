const url = require('url')
const koaRouter = require('koa-router')
const Api = require('../api')
const config = require('../../config')
const qs = require('querystring')
const request = require('../request')
const httpError = require('http-errors')

// 组合返回跳转 rul
const createRedirectUrl = (ctx, appId, ticket, redirect) => {
  const {protocol, host} = url.parse(redirect, true)
  const sessionOptions = ctx.sessionOptions
  const sessionId = ctx.cookies.get(sessionOptions.key, sessionOptions)
  const query = {appId, ticket, sessionId}
  const pathname = '/authentication'
  return url.format({protocol, host, pathname, query})
}

// 组合远程注销 url
const createDestroyUrl = (appId, sessionId, redirect) => {
  const {protocol, host} = url.parse(redirect, true)
  const pathname = '/destroy'
  const query = {appId, sessionId}
  return url.format({protocol, host, pathname, query})
}

// 注销远程登录用户
const destroySSO = async (sso, sessionId, excludeId) => {
  const appIds = Object.keys(sso).filter(appId => appId !== excludeId)
  if (!appIds.length) {
    return
  }

  const promises = appIds.map(async (appId) => {
    const redirect = sso[appId]
    const url = createDestroyUrl(appId, sessionId, redirect)
    await request.get(url)
      .catch(err => {
        console.error('执行远程用户注销操作失败')
        console.error(appId, redirect)
        console.error(err)
      })
  })

  await Promise.all(promises)
}

// 用户登录页面
const index = options => async (ctx, next) => {
  const {appId, redirect, type} = ctx.query

  if (typeof ctx.session.count === 'undefined') {
    ctx.session.count = 0
  }

  // 如果没有跳转路径则显示页面
  if (!redirect || !appId) {
    await next()
    return
  }

  /*
    没有登录用户或 type 的值为 relogin(重新登录)
  */
  if (!ctx.session.user || type === 'relogin') {
    await next()
    return
  }

  // 请求 ticket
  let ticket = null
  try {
    const result = await Api.ticket(ctx.session.token)
    ticket = result.root
  } catch (e) {
    console.error(e)
    await next()
    return
  }

  ctx.session.sso = {
    ...ctx.session.sso,
    [appId]: redirect
  }

  /*
    用户请求 ticket 成功
    创建 跳转链接，并跳转
  */
  const redirectUrl = createRedirectUrl(ctx, appId, ticket, redirect)
  ctx.redirect(redirectUrl)
}

// 用户登录接口
const login = options => async (ctx, next) => {
  // 默认登录应用参数
  let appId = options.defaultAppid
  let redirect = options.defaultAppHost

  // 尝试获取登录应用的信息参数
  try {
    const {query} = url.parse(ctx.header.referer, true)
    appId = query.appId || appId
    redirect = query.redirect || redirect
  } catch (e) {}

  // 登录
  let token = null
  let user = null
  try {
    const result = await Api.login(ctx.request.body)
    if (result.code === '120002') {
      ctx.throw(400, result.message || '用户已被锁定，请联系管理员')
    }
    token = result.ssoToken
    user = result.root
  } catch (e) {
    console.error(e)
    ctx.throw(400, e.message || '账号或密码错误')
  }

  // 获取授权 ticker
  let ticket
  try {
    const result = await Api.ticket(token)
    ticket = result.root
  } catch (e) {
    console.error(e)
    ctx.throw(400, e.message || '获取 ticket 失败')
  }

  // 清除远程用户登录（如果有）
  if (ctx.session.sso) {
    try {
      await destroySSO(ctx.session.sso)
    } catch (e) {
      console.error('错误：清除远程用户登录')
      console.error(ctx.session.sso)
      console.error(e)
    }
  }

  // 设置登录标记
  ctx.session.token = token
  ctx.session.user = user
  ctx.session.sso = {
    [appId]: redirect
  }

  // 组合跳转 url
  const redirectUrl = createRedirectUrl(ctx, appId, ticket, redirect)
  ctx.body = {code: '100001', redirect: redirectUrl}
}

// 注册
const register = options => async (ctx, next) => {
  const {imgCode, imgKey, phone, pwd, smsCode} = ctx.request.body
  const result = await Api.register({imgCode, imgKey, phone, pwd, smsCode})
  ctx.body = result
}

// 远程注销登录用户
const destroy = options => async (ctx, next) => {
  const {sessionId, appId} = ctx.query
  if (!sessionId) {
    ctx.throw(400, '注销用户操作缺少关键参数')
  }

  // 获取登录用户信息
  const sessionOptions = ctx.sessionOptions
  const session = await sessionOptions.store.get(sessionId)
  const {sso, user, token, ...data} = session

  // 注销行程登录用户(排除发送注销操作的服务)
  if (typeof sso === 'object') {
    try {
      await destroySSO(sso, sessionId, appId)
    } catch (e) {
      console.error('错误：注销行程登录用户(排除发送注销操作的服务)')
      console.error(sso, sessionId, appId)
      console.error(e)
    }
  }

  // 注销本地
  try {
    await sessionOptions.store.set(sessionId, data)
  } catch (e) {
    console.error('错误：注销本地')
    console.error(sessionId, data)
    console.error(e)
  }

  ctx.body = {code: '100001', message: 'successed'}
}

// 登录服务
/**
 * appId, appHost, defaultAppid, defaultAppHost
 */
module.exports = (options) => {
  const router = koaRouter()

  router.get('/', index(options))
  router.post('/api/login', login(options))
  router.get('/api/destroy', destroy(options))

  return router.routes()
}
