import React from 'react'
import classnames from 'classnames'
import HostLink from '../../components/HostLink'
import styles from './Logo.css'

const Logo = props => {
  return (
    <HostLink app="front" to="/" className={classnames('pull-left', styles.wrap, props.className)} title="曼威平台">
      <img src="/images/logo.png" />
    </HostLink>
  )
}

export default Logo
