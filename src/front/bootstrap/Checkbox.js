import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const propTypes = {
  inline: PropTypes.bool
}

const contextTypes = {
  _field: PropTypes.object
}

const Checkbox = (props, context) => {
  const {children, inline, ...checkboxProps} = props
  const checkboxClassName = classnames({
    'checkbox': !inline,
    'checkbox-inline': inline,
    'disabled': props.disabled
  })
  const input = context._field ? context._field.input : null
  const checkbox = {}
  if (input) {
    checkbox.onChange = props.value ? (e) => {
      input.onChange(e.target.checked ? props.value : '')
    } : input.onChange
    checkbox.checked = props.value ? props.value === input.value : input.value
  }
  const label = (
    <label className={inline ? checkboxClassName : ''}>
      <input type="checkbox" {...checkboxProps} {...checkbox}/> {children}
    </label>
  )

  return inline ? label : <div className={checkboxClassName}>{label}</div>
}

Checkbox.propTypes = propTypes
Checkbox.contextTypes = contextTypes

export default Checkbox
