const config = require('../../config')

module.exports = async (ctx, next) => {
  // 初始化
  const initialState = {
    user: {
      data: ctx.session.user || null
    }
  }

  ctx.localeData = {
    __APPID__: ctx.appId,
    // 多应用Host地址
    __HOSTS__: config.hosts,
    // 设置租户ID
    __TENANTID__: config.tenantId,
    // 初始化 State
    __INITIAL_STATE__: initialState
  }

  await next()
}
