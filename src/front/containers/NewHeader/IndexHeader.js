import React from 'react'
import classnames from 'classnames'
import {hosts} from '../../lib/utils'
import Nav from './Nav'
import Logo from './Logo'

import styles from './IndexHeader.css'

const IndexHeader = props => {
  let style = {top: (props.scrollTop && props.scrollTop >= 32 ? 0 : 32)}
  return (
    <header className={styles.head}>
      <img src={hosts('admin') + '/login'} style={{display: 'none'}}></img>
      <section className={styles.wrap} style={style}>
        <div className={classnames('container', styles.container)}>
          <Logo />
          <Nav className={styles.nav}/>
        </div>
      </section>
    </header>
  )
}

export default IndexHeader
