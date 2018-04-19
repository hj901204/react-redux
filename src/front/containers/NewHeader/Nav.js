import React, {Component} from 'react'
import classnames from 'classnames'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import styles from './Nav.css'

class Nav extends Component {
  state = {
    active: '首页'
  }
  render() {
    const {className, user = {}} = this.props
    const {active} = this.state
    return (
      <div className={classnames(styles.wrap, className)} >
        <Link to="/" style={{borderBottom: active === '首页' ? 'none' : 'none'}}>首页</Link>
        <Link to="/card" style={{borderBottom: active === '在线加工' ? 'none' : 'none'}}>在线加工</Link>
        <a href="http://www.mainiway.com" target="_blank" style={{borderBottom: active === '曼威C2M' ? 'none' : 'none'}}>曼威C2M</a>
        <Link to="/Copartner" target="_blank" style={{borderBottom: active === '合作伙伴' ? 'none' : 'none'}}>合作伙伴</Link>
        {
          !user.data ? <a href="/login" className={styles.loginBtn}>登录</a> : null
        }
      </div>
    )
  }
}

const mapStateToProps = ({user}) => ({user})

export default connect(
  mapStateToProps
)(Nav)
