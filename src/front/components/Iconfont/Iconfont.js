import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './Iconfont.css'

const Iconfont = props => {
  const {className, name} = props
  return (
    <i className={classnames(styles.iconfont, styles[`icon-${name}`], className, {
      [styles.small]: props.small
    })} />
  )
}

Iconfont.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Iconfont
