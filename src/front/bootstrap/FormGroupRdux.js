import React from 'react'
import PropTypes from 'prop-types'
import {Field} from 'redux-form'

import FormGroupReduxRenderField from './FormGroupReduxRenderField'

const propTypes = {
  // 字段名称
  name: PropTypes.string.isRequired
}

const FormGroupRdux = props => {
  return <Field {...props} component={FormGroupReduxRenderField} />
}

FormGroupRdux.propTypes = propTypes

export default FormGroupRdux
