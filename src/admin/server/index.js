const renderer = require('../../server/middlewares/renderer')
const locale = require('../../server/middlewares/locale')
const createApp = require('../../server/createApp')
const consumer = require('../../server/sso/consumer')
const config = require('../../config')

const appId = 'admin'
const ssoAppId = 'sso'
const appHost = config.hosts[appId]
const ssoAppHost = config.hosts[ssoAppId]
const frontAppHost = config.hosts['front']

const middlewares = [
  consumer({appId, ssoAppId, appHost, ssoAppHost}),
  async (ctx, next) => {
    if (!ctx.session.user) {
      return ctx.redirect('/login')
    }
    await next()
  },
  locale,
  async (ctx, next) => {
    ctx.localeData.__FRONT_HOST__ = frontAppHost
    await next()
  },
  renderer()
]

module.exports = createApp(appId, middlewares)
