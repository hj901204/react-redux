import React from 'react'
import classnames from 'classnames'
import HostLink from '../../components/HostLink'

import logo from './logo.png'
import styles from './Logo.css'

const Logo = props => {
  return (
    <HostLink app="front" to="/" className={classnames(styles.logo, {
      [styles.collapsed]: props.collapsed
    })}>
      <img title="曼威C2M平台" src={logo}/>
    </HostLink>
  )
}

export default Logo
