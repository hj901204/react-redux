import React from 'react'

// 登录较验
const onEnter = (getState) => {
  const state = getState()
  if (!state.user.data) {
    window.location.href = '/login'
    return false
  }
}

export default [
  {
    path: '/',
    exact: true,
    asyncComponent: () => import(/* webpackChunkName: "Index" */ './containers/NewIndex/Index')
  },
  {
    path: '/Card',
    exact: true,
    onEnter,
    asyncComponent: () => import(/* webpackChunkName: "Card" */ './containers/Card/Card')
  },
  {
    path: '/LargeScreen',
    exact: true,
    asyncComponent: () => import(/* webpackChunkName: "LargeScreen" */ './containers/LargeScreen/LargeScreen')
  },
  {
    path: '/Copartner',
    exact: true,
    asyncComponent: () => import(/* webpackChunkName: "LargeScreen" */ './containers/Copartner/Copartner')
  }
]
