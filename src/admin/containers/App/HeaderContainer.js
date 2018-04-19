import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Menu, Avatar, Icon, Layout} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import classnames from 'classnames'
import {Link} from '../../components/Framework'
import {hosts} from '../../lib/utils'
import Logo from './Logo'
import HostLink from '../../components/HostLink'

import {menusToggle} from '../../redux/models/menus'

import styles from './HeaderContainer.css'

class HeaderContainer extends Component {
  static contextTypes = {
    frame: PropTypes.shape({
      reload: PropTypes.func.isRequired
    }).isRequired
  }

  reload = () => {
    this.context.frame.reload()
  }

  render() {
    const {user} = this.props
    return (
      <div className={styles.header}>
        <div className={styles.left}>
          <Logo collapsed={this.props.collapsed} />
          <img src={hosts('front') + '/login'} style={{display: 'none'}}></img>
          <div className={styles.nav}>
            <a className={classnames(styles.item, styles.active)} data-name="purchaser">客户中心</a>
          </div>
          {/* <Icon
            title="刷新"
            className={styles.trigger}
            type="reload"
            onClick={this.reload}
          /> */}
        </div>
        <div className={styles.info}>
          <Link className={styles.infoitem} to="/buyerPendingOrder" title="待处理订单">您好{' '}<span>{user.data.realName || user.data.account}</span></Link>
          <a href="/logout" className={styles.infoitem}>退出</a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({menus, user}) => ({menus, user})
const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer)
