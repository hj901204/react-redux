import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {elementType} from 'react-prop-types'

const propTypes = {
  component: elementType
}

const defaultProps = {
  component: 'span'
}

const FormControlFeedback = props => {
  const {component: Comp, className, ...feedbackProps} = props
  const feedbackClassName = classnames('form-control-feedback', className)

  return <Comp {...feedbackProps} className={feedbackClassName}/>
}

FormControlFeedback.propTypes = propTypes
FormControlFeedback.defaultProps = defaultProps

export default FormControlFeedback
