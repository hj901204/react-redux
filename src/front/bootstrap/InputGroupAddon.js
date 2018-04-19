import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const InputGroupAddon = props => {
  const {className, ...addonProps} = props
  const addonClassName = classnames('input-group-addon', className)

  return <div {...addonProps} className={addonClassName}/>
}

export default InputGroupAddon
