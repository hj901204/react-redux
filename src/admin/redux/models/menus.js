const TOGGLE = 'admin/menus/TOGGLE'
const TOGGLEURL = 'admin/menus/TOGGLEURL'

const initialState = {
  // 当前角色
  current: 'purchaser',
  // 采购商
  purchaser: [
    {
      name: '交易管理',
      icon: 'bank',
      children: [
        {
          name: '待处理订单',
          url: '/buyerPendingOrder'
        }
      ]
    }
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE:
      let current = 'purchaser'
      return {...state, current}

    case TOGGLEURL:
      return {...state, current}
    default:
      return state
  }
}

export const menusToggle = (current) => {
  return {type: TOGGLE, current}
}

export const menusByUrl = (pathname) => {
  return {type: TOGGLEURL, pathname}
}
