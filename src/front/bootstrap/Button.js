import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const propTypes = {
  component: PropTypes.node,
  status: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'waring', 'danger', 'link']),
  size: PropTypes.oneOf(['large', 'small']),
  block: PropTypes.bool
}

const defaultProps = {
  component: 'button',
  status: 'default',
  block: false
}

const Button = props => {
  const {component: Comp, className, status, size, block, ...btnProps} = props
  const btnClassName = classnames('btn', `btn-${status}`, className, {
    'btn-lg': size === 'large',
    'btn-sm': size === 'small',
    'btn-block': block,
    'disabled': props.disabled
  })
  return (
    <Comp {...btnProps} className={btnClassName}/>
  )
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps

export default Button
