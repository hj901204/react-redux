import React from 'react'
import PropTypes from 'prop-types'

import FormGroup from './FormGroup'

class FormGroupReduxRenderField extends React.Component {
  static childContextTypes = {
    _field: PropTypes.object
  };

  getChildContext() {
    return {
      _field: this.props
    }
  }

  render() {
    const {input, meta, ...groupProps} = this.props
    const status = meta.error && meta.touched ? 'error' : null
    return <FormGroup {...groupProps} status={status}/>
  }
}

export default FormGroupReduxRenderField
