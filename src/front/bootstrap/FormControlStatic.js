import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const propTypes = {
  component: PropTypes.node
}

const defaultProps = {
  component: 'p'
}

const FormControlStatic = props => {
  const {component: Comp, className, ...staticProps} = props
  const staticClassName = classnames('form-control-static', className)

  return <Comp {...staticProps} className={staticClassName}/>
}

FormControlStatic.propTypes = propTypes
FormControlStatic.defaultProps = defaultProps

export default FormControlStatic
