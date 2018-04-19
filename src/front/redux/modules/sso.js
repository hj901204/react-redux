import request from '../../lib/request'

const LOGIN = 'front/sso/LOGIN'
const LOGIN_SUCCESS = 'front/sso/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'front/sso/LOGIN_FAILURE'

const CHECK_USED = 'front/sso/CHECK_USED'
const CHECK_USED_SUCCESS = 'front/sso/CHECK_USED_SUCCESS'
const CHECK_USED_FAILURE = 'front/sso/CHECK_USED_FAILURE'

const SEND_CODE = 'front/sso/SEND_CODE'
const SEND_CODE_SUCCESS = 'front/sso/SEND_CODE_SUCCESS'
const SEND_CODE_FAILURE = 'front/sso/SEND_CODE_FAILURE'

const REGISTER = 'front/sso/REGISTER'
const REGISTER_SUCCESS = 'front/sso/REGISTER_SUCCESS'
const REGISTER_FAILURE = 'front/sso/REGISTER_FAILURE'

const RESET = 'front/sso/RESET'
const RESET_SUCCESS = 'front/sso/RESET_SUCCESS'
const RESET_FAILURE = 'front/sso/RESET_FAILURE'

const CHECK_USER = 'front/sso/CHECK_USER'
const CHECK_USER_SUCCESS = 'front/sso/CHECK_USER_SUCCESS'
const CHECK_USER_FAILURE = 'front/sso/CHECK_USER_FAILURE'

const CHECK_CAPTCHA = 'front/sso/CHECK_CAPTCHA'
const CHECK_CAPTCHA_SUCCESS = 'front/sso/CHECK_CAPTCHA_SUCCESS'
const CHECK_CAPTCHA_FAILURE = 'front/sso/CHECK_CAPTCHA_FAILURE'

const initialState = {
  isFetching: false,
  data: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case CHECK_USED:
    case SEND_CODE:
    case REGISTER:
    case RESET:
    case CHECK_CAPTCHA:
      return {...state, isFetching: true, error: null}

    case LOGIN_FAILURE:
    case CHECK_USED_FAILURE:
    case SEND_CODE_FAILURE:
    case REGISTER_FAILURE:
    case RESET_FAILURE:
    case CHECK_CAPTCHA_FAILURE:
      return {...state, isFetching: false, error: action.error}

    default:
      return state
  }
}

// 登录
export const login = body => dispatch => {
  dispatch({type: LOGIN})
  return request
    .post('/api/login')
    .send(body)
    .then(data => dispatch({type: LOGIN_SUCCESS, data}))
    .catch(error => {
      dispatch({type: LOGIN_FAILURE, error})
      throw error
    })
}

// 验证手机号是否已使用
export const checkPhoneUsed = body => dispatch => {
  dispatch({type: CHECK_USED})
  return request
    .post('/api/purchaser/cloudcut/user/checkPhoneIsUsed')
    .send(body)
    .then(data => dispatch({type: CHECK_USED_SUCCESS, data}))
    .catch(error => {
      dispatch({type: CHECK_USED_FAILURE, error})
      throw error
    })
}

// 发送验证码
export const validateCodeSend = body => dispatch => {
  dispatch({type: SEND_CODE})
  return request
    .post('/api/purchaser/cloudcut/message/messageSend/sendVerCode')
    .send(body)
    .then(data => dispatch({type: SEND_CODE_SUCCESS, data}))
    .catch(error => {
      dispatch({type: SEND_CODE_FAILURE, error})
      throw error
    })
}

// 注册
export const register = body => dispatch => {
  dispatch({type: REGISTER})
  return request
    .post('/api/purchaser/cloudcut/user/doRegister')
    .send(body)
    .then(data => dispatch({type: REGISTER_SUCCESS, data}))
    .catch(error => {
      dispatch({type: REGISTER_FAILURE, error})
      throw error
    })
}

// 找回密码
export const resetPassword = body => dispatch => {
  dispatch({type: RESET})
  return request
    .post('/api/purchaser/cloudcut/user/resetPwd')
    .send(body)
    .then(data => dispatch({type: RESET_SUCCESS, data}))
    .catch(error => {
      dispatch({type: RESET_FAILURE, error})
      throw error
    })
}

// 账户对应手机号或邮箱
export const checkMobileEmail = body => dispatch => {
  dispatch({type: CHECK_USER})
  return request
    .post('/api/purchaser/cloudcut/checkPurchaserUser/checkMobileEmail')
    .send(body)
    .then(data => dispatch({type: CHECK_USER_SUCCESS, data}))
    .catch(error => {
      dispatch({type: CHECK_USER_FAILURE, error})
      throw error
    })
}

// 找回密码验证验证码
export const captchaVerify = body => dispatch => {
  dispatch({type: CHECK_CAPTCHA})
  return request
    .post('/api/purchaser/cloudcut/user/captchaVerify')
    .send(body)
    .then(data => dispatch({type: CHECK_CAPTCHA_SUCCESS, data}))
    .catch(error => {
      dispatch({type: CHECK_CAPTCHA_FAILURE, error})
      throw error
    })
}
