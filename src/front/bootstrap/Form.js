import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const propTypes = {
  horizontal: PropTypes.bool,
  inline: PropTypes.bool
}

const defaultProps = {
  inline: false,
  horizontal: false
}

const Form = props => {
  const {inline, horizontal, className, ...formProps} = props
  const formClassName = classnames(className, {
    'form-inline': inline,
    'form-horizontal': horizontal
  })
  return (
    <form {...formProps} className={formClassName}/>
  )
}

Form.propTypes = propTypes
Form.defaultProps = defaultProps

export default Form
