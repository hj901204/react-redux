import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const InputGroupBtn = props => {
  const {className, ...addonProps} = props
  const addonClassName = classnames('input-group-btn', className)

  return <div {...addonProps} className={addonClassName}/>
}

export default InputGroupBtn
