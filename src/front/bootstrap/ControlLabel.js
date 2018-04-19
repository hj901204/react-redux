import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const propTypes = {
  srOnly: PropTypes.bool
}

const ControlLabel = props => {
  const {srOnly, className, ...labelProps} = props
  const labelClassName = classnames('control-label', className, {
    'sr-only': srOnly
  })
  return (
    <label {...props} className={labelClassName}/>
  )
}

ControlLabel.propTypes = propTypes

export default ControlLabel
