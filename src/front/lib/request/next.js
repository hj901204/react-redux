import {Layer} from '../../bootstrap'

export const next = body => {
  switch (body.status) {
    // 错误请求
    case 400:
      Layer.msg(body.message)
      break

    // 未授权/登录超时
    case 401:
      Layer.confirm('当前用户登录超时或未登录，是否重新登录？', () => {
        window.location.href = '/login'
      })
      break

    default:
      Layer.msg(body.message || '接口请求出错')
  }
}

export default next
