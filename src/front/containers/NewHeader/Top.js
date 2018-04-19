import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Layer from '../../bootstrap/Layer'
import {hosts} from '../../lib/utils'
import HostLink from '../../components/HostLink'
import {Link} from 'react-router-dom'
import {logout} from '../../redux/modules/user'

import styles from './Top.css'

class Top extends React.Component {
  static propTypes = {
    user: PropTypes.object
  }

  logout = () => {
    this.props.logout()
      .then(() => {
        Layer.msg('退出成功')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    const {user} = this.props
    return (
      <section className={styles.wrap}>
        <div className="container">
          <div className="pull-left">
            <img src={hosts('admin') + '/login'} style={{display: 'none'}}></img>
            <span className={classnames(styles.text, styles.nomargin)}><Link to='/LargeScreen'>欢迎来到曼威平台！</Link></span>
            {
              user.data && user.data.account ? (
                <span className={styles.text}>
                  <HostLink className={styles.link} app="admin" to="/">您好 {user.data.realName || user.data.account}</HostLink> |
                  <a className={styles.link} onClick={this.logout} href="javascript:;"> 退出</a>
                </span>
              ) : (
                <span className={styles.text}>
                  <a href="/login" className={styles.link}>请登录</a>
                </span>
              )
            }
          </div>
          <div className="pull-right">
            <span className={styles.text}>
              <HostLink app="admin" to="/buyerPendingOrder">我的订单</HostLink>
            </span>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {user}
}

const mapDispatchToProps = dispatch => {
  return {
    logout: bindActionCreators(logout, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Top)
