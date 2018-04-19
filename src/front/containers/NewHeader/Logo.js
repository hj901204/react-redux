import React from 'react'
import classnames from 'classnames'
import HostLink from '../../components/HostLink'
import styles from './Logo.css'
let widths = document.body.clientWidth
const Logo = props => {
  return (
    widths === 768 ? (
      <HostLink app="front" to="/" className={classnames('pull-left', styles.wrap, props.className)} title="mainiway" style={{marginRight: '10px'}}>
        <img src="../../images/logo.png" />
      </HostLink>
    ) : (
      <HostLink app="front" to="/" className={classnames('pull-left', styles.wrap, props.className)} title="mainiway" >
        <img src="../../images/logo.png" />
      </HostLink>
    )
  )
}

export default Logo
