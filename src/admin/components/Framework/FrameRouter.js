import React, {Component} from 'react'
import PropTypes from 'prop-types'
import createHistory from 'history/createBrowserHistory'
import {Router} from 'react-router'
import {matchRoutes} from 'react-router-config'

class FrameRouter extends Component {
  static propTypes = {
    basename: PropTypes.string,
    forceRefresh: PropTypes.bool,
    getUserConfirmation: PropTypes.func,
    keyLength: PropTypes.number,
    children: PropTypes.node
  }

  static childContextTypes = {
    frame: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      frame: {
        list: this.state.list,
        setInstance: this.setInstance,
        reload: this.reload,
        remove: this.remove,
        removeOthers: this.removeOthers,
        removeLefts: this.removeLefts,
        removeRights: this.removeRights
      }
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      list: []
    }
    this._instance = {}
    const {routes, store, ...historyProps} = this.props
    this.history = createHistory(historyProps)

    if (this.history.location.pathname === '/') {
      const {user} = store.getState()
      if (user.data) {
        switch (user.data.roleId) {
          case '1':
            this.history.push('/buyerPendingOrder')
            break
          case '2':
            this.history.push('/platform')
            break
          case '3':
            this.history.push('/supplierIndex')
            break
        }
      }
    }

    window.reactHistory = this.history
  }

  componentDidMount() {
    this.push(this.history.location)
    this.preLocation = this.history.location
    this.history.listen((location, action) => {
      if (action === 'REPLACE') {
        this.replace(location, this.preLocation)
      } else {
        this.push(location)
      }
      this.preLocation = location
    })
  }
  // 替换当前页面
  replace = (location, preLocation) => {
    location = this.getLocation(location)
    if (location.pathname === preLocation.pathname) {
      return
    }

    const index = this.state.list.findIndex(item => item.location.pathname === location.pathname)
    let list = this.state.list
    let current = {}

    if (!~index) {
      const branch = matchRoutes(this.props.routes, location.pathname)
      current = {location, branch}
    } else {
      this.reload()
      current = list[index]
      list = list.filter(item => {
        return item.location.pathname !== location.pathname
      })
    }

    const preIndex = list.findIndex(item => item.location.pathname === preLocation.pathname)

    list = [
      ...list.slice(0, preIndex),
      current,
      ...list.slice(preIndex + 1, list.length)
    ]

    this.setState({list})
  }

  // 切换到一个新页面（如果新页面不存在，就新建页面）并获取焦点
  push = (location) => {
    location = this.getLocation(location)
    const stateList = this.state.list
    const index = stateList.findIndex(item => item.location.pathname === location.pathname)
    const branch = matchRoutes(this.props.routes, location.pathname)
    let list = []

    if (!~index) {
      // push
      list = [...stateList, {location, branch}]
    } else {
      // focus
      this.reload()
      list = [...stateList]
    }

    this.setState({list})
  }

  // 关闭
  remove = (location = this.history.location) => {
    location = this.getLocation(location)
    const isCurrent = location.pathname === this.history.location.pathname
    const index = this.state.list.findIndex(item => item.location.pathname === location.pathname)
    if (!~index) {
      return
    }

    const list = [
      ...this.state.list.slice(0, index),
      ...this.state.list.slice(index + 1, this.state.list.length)
    ]

    if (isCurrent && list.length) {
      const current = index - 1 < 0 ? (list.length === 1 ? 0 : 1) : index - 1
      const item = list[current]
      this.history.push(item.location.pathname)
    }
    this.setState({list})
  }

  // 关闭其他页面
  removeOthers = (location) => {
    location = this.getLocation(location)
    const index = this.state.list.findIndex(item => item.location.pathname === location.pathname)
    if (!~index) {
      return
    }
    const item = this.state.list[index]
    const list = [item]
    this.history.push(item.location.pathname)
    this.setState({list})
  }

  // 关闭左侧
  removeLefts = (location) => {
    location = this.getLocation(location)
    const index = this.state.list.findIndex(item => item.location.pathname === location.pathname)
    if (!~index) {
      return
    }
    const list = [
      ...this.state.list.slice(index, this.state.list.length)
    ]
    const currentLocation = this.history.location
    const currentIndex = list.findIndex(item => {
      return item.location.pathname === currentLocation.pathname
    })
    if (!~currentIndex) {
      const item = list[0]
      this.history.push(item.location.pathname)
    }
    this.setState({list})
  }

  // 关闭右侧
  removeRights = (location) => {
    location = this.getLocation(location)
    const index = this.state.list.findIndex(item => item.location.pathname === location.pathname)
    if (!~index) {
      return
    }
    const list = [
      ...this.state.list.slice(0, index + 1)
    ]
    const currentLocation = this.history.location
    const currentIndex = list.findIndex(item => {
      return item.location.pathname === currentLocation.pathname
    })
    if (!~currentIndex) {
      const item = list[list.length - 1]
      this.history.push(item.location.pathname)
    }
    this.setState({list})
  }

  setInstance = (location, ref) => {
    location = this.getLocation(location)
    this._instance[location.pathname] = ref
  }

  // 刷新页面
  reload = (location = this.history.location) => {
    location = this.getLocation(location)
    let ref = this._instance[location.pathname]
    ref = (ref && ref.wrappedInstance) ? ref.wrappedInstance : ref
    if (!ref || !ref.componentReload) {
      return
    }

    ref.componentReload()
  }

  getLocation(location) {
    return typeof location === 'string' ? {pathname: location} : location
  }

  render() {
    return <Router history={this.history} children={this.props.children}/>
  }
}

export default FrameRouter
