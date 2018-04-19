import request from './request'

// 注册用户名较验
export const checkMobileEmail = data => {
  return request.post('/api/purchaser/cloudcut/checkPurchaserUser/checkMobileEmail')
    .send(data)
}

// 找回密码用户名较验
export const checkUser = data => {
  return request.post('/api/purchaser/cloudcut/checkPurchaserUser/checkUser')
    .send(data)
}

// 验证手机号是否已使用
export const checkPhoneUsed = data => {
  return request
    .post('/api/purchaser/cloudcut/user/checkPhoneIsUsed')
    .send(data)
}
