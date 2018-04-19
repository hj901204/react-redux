import React from 'react'
import classnames from 'classnames'

import styles from './LoginRadio.css'

const LoginRadio = props => {
  const {onChange, className, value, checked, children} = props
  return (
    <div
      className={classnames(className, styles.item, {
        [styles.active]: checked
      })}
      onClick={() => onChange(value)}
    >
      <span>{children}</span>
    </div>
  )
}

export default LoginRadio
