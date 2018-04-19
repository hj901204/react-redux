const request = require('./request')
const config = require('../config')

const apiHost = config.api['/api/purchaser']

// 获取字典
exports.fetchDictionary = body => {
  return request
    .post(`${apiHost}/cloudcut/dictionary/selectList`)
    .send(body)
}

// 账号密码登录
exports.login = body => {
  return request
    .post(`${apiHost}/cloudcut/user/doLogin`)
    .send(body)
}

// ticket 登录
exports.loginByTicket = (ticket) => {
  return request
    .post(`${apiHost}/cloudcut/user/getTokenByOnce`)
    .send({onceToken: ticket})
}

// 临时登录 ticket
exports.ticket = (token) => {
  return request
    .post(`${apiHost}/cloudcut/user/getOnceToken`)
    .set('ssoToken', token)
    .send({token})
}

// 用户信息
exports.userInfo = (token) => {
  return request
    .post(`${apiHost}/cloudcut/user/queryByToken`)
    .set('ssoToken', token)
    .send({ssoToken: token})
}

// 注册
exports.register = (body) => {
  return request
    .post(`${apiHost}/cloudcut/user/doRegister`)
    .send(body)
}

// 用户退出
exports.logout = (token, body) => {
  return request
    .post(`${apiHost}/cloudcut/user/doLogout`)
    .set('ssoToken', token)
    .send(body)
}
