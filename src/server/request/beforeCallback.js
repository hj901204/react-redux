module.exports = function (argvs) {
  return function (request) {
    if (!request._header['content-type']) {
      request.type('json')
    }
    if (request.method === 'POST') {
      request.send(argvs)
    }
    if (request.method === 'GET') {
      request.query(argvs)
    }
  }
}
