const renderer = require('../../server/middlewares/renderer')
const locale = require('../../server/middlewares/locale')
const createApp = require('../../server/createApp')
const producer = require('../../server/sso/producer')
const config = require('../../config')

const appId = 'sso'
const appHost = config.hosts[appId]
const defaultAppid = 'front'
const defaultAppHost = config.hosts[defaultAppid]

const middlewares = [
  producer({appId, appHost, defaultAppid, defaultAppHost}),
  locale,
  renderer()
]

module.exports = createApp(appId, middlewares)
