import { Modal } from 'antd'

export const next = body => {
  switch (body.status) {
    // 错误请求
    case 400:
      Modal.error({title: '操作失败', content: body.message})
      break

    // 未授权/登录超时
    case 401:
      Modal.confirm({
        title: '未授权/登录超时',
        content: '当前用户登录超时或未登录，是否重新登录？',
        onOk() {
          window.location.href = '/login'
        }
      })
      break

    default:
      Modal.error({title: '操作失败', content: (body.message || '接口请求出错')})
  }
  return body.code
}

export default next
