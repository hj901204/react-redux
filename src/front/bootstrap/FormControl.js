import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {elementType} from 'react-prop-types'
import FormControlStatic from './FormControlStatic'
import FormControlFeedback from './FormControlFeedback'

const propTypes = {
  component: elementType,
  size: PropTypes.oneOf(['large', 'small'])
}

const contextTypes = {
  _field: PropTypes.object
}

const FormControl = (props, context) => {
  const {component: Comp, size, className, getInstance, ...controlProps} = props
  const controlClassName = classnames('form-control', className, {
    'input-lg': size === 'large',
    'input-sm': size === 'small'
  })
  const input = context._field ? context._field.input : null
  const onChange = input ? (e) => {
    if (props.onChange) {
      props.onChange(e)
    }
    input.onChange(e)
  } : props.onChange

  return <Comp {...controlProps} {...input} onChange={onChange} ref={getInstance} className={controlClassName} />
}

FormControl.propTypes = propTypes
FormControl.contextTypes = contextTypes

FormControl.Static = FormControlStatic
FormControl.Feedback = FormControlFeedback

export default FormControl
