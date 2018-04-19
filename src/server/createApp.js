const path = require('path')
const http = require('http')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const morgan = require('koa-morgan')
const proxy = require('koa-proxies')
const session = require('koa-session')
const serve = require('koa-static')
const mount = require('koa-mount')
const config = require('../config')
const RedisStore = require('./RedisStore')

const isdev = process.env.NODE_ENV === 'development'

// createApp
module.exports = function createApp(appId, middlewares) {
  const app = new Koa()
  app.context.appId = appId
  app.keys = [`sbh ${appId} secret`, `sbh ${appId} turtle`]
  // helmet
  app.use(helmet())
  // logger
  app.use(morgan(isdev ? 'dev' : 'combined'))

  // static
  app.use(serve(path.resolve(__dirname, `../${appId}/public`), {
    maxage: isdev ? 3600 * 1000 : 0
  }))

  // session
  const store = new RedisStore(config.redis)
  app.use(session({
    store,
    prefix: `sbh:${appId}:`,
    signed: true,
    maxAge: 240 * 60 * 1000,
    key: `sbh:${appId}`
  }, app))

  // error
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      err.status = err.status || 500
      ctx.status = err.status
      ctx.body = {status: err.status, message: err.message}
      if (err.code) {
        ctx.body.code = err.code
      }
      ctx.app.emit('error', err, ctx)
    }
  })

  // token
  app.use(async (ctx, next) => {
    if (ctx.session && ctx.session.token) {
      ctx.request.header['ssoToken'] = ctx.session.token
    }
    await next()
  })

  // proxy api
  Object.keys(config.api).forEach(key => {
    app.use(proxy(key, {
      target: config.api[key],
      changeOrigin: true,
      rewrite: (path) => path.replace(key, '')
    }))
  })

  // body parse
  app.use(bodyParser())

  // middleware
  if (Array.isArray(middlewares)) {
    middlewares.forEach(middleware => {
      app.use(middleware)
    })
  }

  // NotFound
  app.use(async (ctx, next) => {
    ctx.throw(404)
  })

  // logger error
  app.on('error', (err) => {
    console.log(err)
  })

  return app.callback()
}
