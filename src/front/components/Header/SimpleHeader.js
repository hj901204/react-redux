import React from 'react'
import classnames from 'classnames'

import Logo from './Logo'

import styles from './Header.css'

const SimpleHeader = props => {
  return (
    <header className={classnames(styles.wrap, props.className)}>
      <section className={styles.content}>
        <div className={classnames('container', styles.container)}>
          <Logo className={styles.simplelogo} />
          <h1 className={styles.title}>{props.title}</h1>
        </div>
      </section>
    </header>
  )
}

export default SimpleHeader
