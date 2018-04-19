const renderer = require('../../server/middlewares/renderer')
const locale = require('../../server/middlewares/locale')
const createApp = require('../../server/createApp')
const consumer = require('../../server/sso/consumer')
const config = require('../../config')

const appId = 'front'
const ssoAppId = 'sso'
const appHost = config.hosts[appId]
const ssoAppHost = config.hosts[ssoAppId]

const middlewares = [
  consumer({appId, ssoAppId, appHost, ssoAppHost}),
  locale,
  renderer()
]

module.exports = createApp(appId, middlewares)
