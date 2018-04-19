const superagent = require('superagent')
const afterTransducer = require('./afterTransducer')
const beforeTransducer = require('./beforeTransducer')
const afterCallback = require('./afterCallback')
const config = require('../../config')

const tenantId = config.tenantId
const beforeCallback = require('./beforeCallback')({tenantId})

let request = beforeTransducer(beforeCallback)(superagent)
request = afterTransducer(afterCallback)(request)

module.exports = request
