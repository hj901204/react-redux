const url = require('url')
const koaRouter = require('koa-router')
const Api = require('../api')
const config = require('../../config')
const qs = require('querystring')
const request = require('../request')

// 获取被代理后的 host
const getHost = ctx => {
  const proxyHost = ctx.headers['x-forwarded-host']
  const proxyProto = ctx.headers['x-forwarded-proto']
  if (proxyHost) {
    return `${proxyProto}://${proxyHost}`
  }

  return ctx.origin
}

// 获取 referer
const getReferer = ctx => {
  const referer = ctx.headers.referer
  const host = getHost(ctx)
  let referHost = ''
  try {
    const {protocol, host} = url.parse(referer, true)
    referHost = `${protocol}://${host}`
  } catch (e) {}

  if (host === referHost) {
    return referer
  } else {
    return '/'
  }
}

// 登录认证
const authentication = options => async (ctx, next) => {
  const {appId, ticket, sessionId: remoteSessionId} = ctx.query

  // 使用授权码获取 token
  let token = null
  try {
    const result = await Api.loginByTicket(ticket)
    token = result.root
  } catch (err) {
    // token 获取失败返回登录页面
    console.error(ctx.query)
    console.error(err)
    const redirect = getHost(ctx)
    const query = {
      appId: options.appId,
      redirect,
      type: 'relogin',
      message: err.message
    }
    const redirectUrl = `${options.ssoAppHost}?${qs.stringify(query)}`
    ctx.redirect(redirectUrl)
    return
  }

  // 获取用户信息
  let result = await Api.userInfo(token)

  // 设置用户登录信息
  ctx.session.user = result.root
  ctx.session.token = token
  ctx.session.sso = remoteSessionId

  // 关联登录服务凭证
  const sessionOptions = ctx.sessionOptions
  const localSessionId = ctx.cookies.get(sessionOptions.key, sessionOptions)
  sessionOptions.store.set(`sso:${options.appId}:${remoteSessionId}`, localSessionId)

  // 跳转至发起登录需求页面
  ctx.redirect(ctx.session.referer || '/')
}

// 登录并跳转到登录服务
const login = options => async (ctx, next) => {
  const redirect = getHost(ctx)
  const {appId, ssoAppHost} = options
  const query = {appId, redirect}
  const target = `${options.ssoAppHost}?${qs.stringify(query)}`
  // 设置登录成功后的地址
  ctx.session.referer = getReferer(ctx)
  ctx.redirect(target)
}

// 用户退出(本地注销)
const logout = options => async (ctx, next) => {
  const {appId, ssoAppHost} = options

  // 通知登录服务器退出
  const remoteSessionId = ctx.session.sso
  if (!remoteSessionId) {
    ctx.redirect(`${options.ssoAppHost}/login`)
    // ctx.throw(400, '获取用户远程登录服务 sessionId 失败')
    console.log('获取用户远程登录服务 sessionId 失败')
  }
  const remoteQuery = {appId, sessionId: remoteSessionId}
  const remotePathname = '/api/destroy'
  const remoteDestroyUrl = `${ssoAppHost}${remotePathname}?${qs.stringify(remoteQuery)}`

  await request.get(remoteDestroyUrl)
    .catch(err => {
      console.error('通知登录服务器退出操作失败')
      console.error(appId, remoteDestroyUrl)
      console.error(err)
    })

  // 清除本地登录用户信息
  ctx.session.user = null
  ctx.session.token = null
  const sessionOptions = ctx.sessionOptions
  await sessionOptions.store.destroy(`sso:${options.appId}:${remoteSessionId}`)

  if (ctx.headers['content-type'] === 'application/json') {
    ctx.body = {code: '100001', redirect: '/'}
  } else {
    ctx.redirect('/')
  }
}

// 用户注册
const register = options => async (ctx, next) => {
  ctx.redirect(`${options.ssoAppHost}/register`)
}

// 用户注销(远程被注销)
const destroy = options => async (ctx, next) => {
  const {sessionId: remoteSessionId} = ctx.query

  // 获取本地用户信息
  const sessionOptions = ctx.sessionOptions
  const localSessionId = await sessionOptions.store.get(`sso:${options.appId}:${remoteSessionId}`)
  const session = await sessionOptions.store.get(localSessionId)

  // 清除本地用户信息
  const {user, token, ...data} = session
  await sessionOptions.store.set(localSessionId, data)
  await sessionOptions.store.destroy(`sso:${options.appId}:${remoteSessionId}`)

  ctx.body = {code: '100001', message: 'successed'}
}

// 应用页面
/**
 * appId, appHost, ssoAppId, ssoAppHost
 */
module.exports = (options) => {
  const router = koaRouter()

  router.get('/authentication', authentication(options))
  router.get('/login', login(options))
  router.get('/logout', logout(options))
  router.get('/register', register(options))
  router.get('/destroy', destroy(options))

  return router.routes()
}
