import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Route } from '../../components/Framework'

import { menusToggle } from '../../redux/models/menus'

import styles from './SiderContainer.css'

class SiderContainer extends Component {
  state = {
    key: '',
    current: ''
  }
  componentDidMount() {
    const current = 'purchaser'
    this.props.menusToggle(current)
  }

  renderSubMenuItem = (currentModel, subMenu, index, parent = 0) => {
    const key = `${parent}-${index}`
    if (!Array.isArray(subMenu.children)) {
      return (
        <Menu.Item key={key} className={parent === 0 ? '' : styles.submenu}>
          <Link
            className={styles.link}
            to={subMenu.url}
            title={subMenu.name}>
            {subMenu.icon ? <Icon type={subMenu.icon} /> : null}<span>{subMenu.name}</span>
          </Link>
        </Menu.Item>
      )
    }

    return (
      <Menu.SubMenu key={key} title={<span>{subMenu.icon ? <Icon type={subMenu.icon} /> : null}<span className={styles.link}>{subMenu.name}</span></span>}>
        {
          subMenu.children.map((child, index) => {
            return this.renderSubMenuItem(currentModel, child, index, key)
          })
        }
      </Menu.SubMenu>
    )
  }

  render() {
    const { user, menus } = this.props
    const [role, group] = menus.current.split('.')
    let menusList = menus[role] || []
    if (group) {
      const list = menusList.filter(item => item.group === group)
      menusList = list.length ? list[0].children : []
    }
    return (
      <Menu
        openKeys={['0-0']} selectedKeys={['0-0-0']}
        style={{ backgroundColor: '#2f93e1', color: '#fff', paddingTop: 10, paddingBottom: 0 }}
        mode="inline"
      >
        {
          menusList.map((subMenu, index) => {
            return this.renderSubMenuItem(menus.current, subMenu, index)
          })
        }
      </Menu>
    )
  }
}

const mapStateToProps = ({ menus, user }) => ({ menus, user })
const mapDispatchToProps = (dispatch) => ({
  menusToggle: bindActionCreators(menusToggle, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiderContainer)
