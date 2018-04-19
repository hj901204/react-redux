import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {elementType} from 'react-prop-types'

import './FormGroup.css'

const propTypes = {
  component: elementType,
  inline: PropTypes.bool,
  feedback: PropTypes.bool,
  status: PropTypes.oneOf(['success', 'warning', 'error']),
  size: PropTypes.oneOf(['large', 'small'])
}

const defaultProps = {
  inline: false,
  component: 'div'
}

const FormGroup = props => {
  const {component: Comp, size, inline, className, status, feedback, ...groupProps} = props
  const groupClassName = classnames('form-group', className, {
    'form-group-lg': size === 'large',
    'form-group-sm': size === 'smail',
    'form-group-inline': inline,
    [`has-${status}`]: status,
    'has-feedback': feedback
  })

  return <Comp {...groupProps} className={groupClassName} />
}

FormGroup.propTypes = propTypes
FormGroup.defaultProps = defaultProps

export default FormGroup
