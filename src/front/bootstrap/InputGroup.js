import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import InputGroupAddon from './InputGroupAddon'
import InputGroupBtn from './InputGroupBtn'

const propTypes = {
  separate: PropTypes.bool
}
const defaultProps = {
  separate: false
}

const InputGroup = props => {
  const {className, separate, ...inputProps} = props
  const inputClassName = classnames('input-group', className, {
    'input-group-separate': separate
  })

  return <div {...inputProps} className={inputClassName}/>
}

InputGroup.propTypes = propTypes
InputGroup.defaultProps = defaultProps
InputGroup.Addon = InputGroupAddon
InputGroup.Btn = InputGroupBtn

export default InputGroup
