import React from 'react'

export default [{
  path: '/buyerPendingOrder',
  title: '待处理订单',
  exact: true,
  asyncComponent: () => import(/* webpackChunkName: "buyerPendingOrder" */ './containers/BuyerPendingOrder')
},
{
  path: '/buyerPendingOrder/detail/:orderCode',
  title: '订单详情',
  exact: true,
  asyncComponent: () => import(/* webpackChunkName: "buyerPendingOrderDetail" */ './containers/BuyerPendingOrder/Detail')
}]
