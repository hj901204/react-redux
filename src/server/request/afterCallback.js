const _isEmpty = require('lodash/isEmpty')

module.exports = function (err, res, callback) {
  let error
  if (err) {
    error = { status: 400, message: err.message }
    if (err.response && err.response.body) {
      error = err.response.body
    }

    return callback(error, null)
  }
  let body = res.body
  if (_isEmpty(body)) {
    try {
      body = JSON.parse(res.text)
    } catch (e) {
      body = {}
    }
  }
  switch (body.code) {
    case '100001':
    case '120008':
    case '120015':
    case '120014':
    case '100004':
    case '120002':
    case '120018':
    case '120022':
    case '120020':
      callback(null, body)
      break

    case '120004':
      error = {status: 401, message: body.message}
      callback(error, null)
      break

    default:
      error = {status: 400, code: body.code, message: body.message}
      callback(error, null)
  }
}
