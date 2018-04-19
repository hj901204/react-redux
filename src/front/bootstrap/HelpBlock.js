import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {elementType} from 'react-prop-types'

const propTypes = {
  component: elementType
}

const defaultProps = {
  component: 'div'
}

const contextTypes = {
  _field: PropTypes.object
}

const HelpBlock = (props, context) => {
  const {component: Comp, className, ...helpProps} = props
  const helpClassName = classnames('help-block', className)
  let newHelpProps = helpProps
  const meta = context._field ? context._field.meta : null
  if (meta) {
    newHelpProps = {
      ...newHelpProps,
      children: (meta.invalid && meta.touched) ? meta.error : props.children
    }
  }

  return <Comp {...newHelpProps} className={helpClassName}/>
}

HelpBlock.propTypes = propTypes
HelpBlock.defaultProps = defaultProps
HelpBlock.contextTypes = contextTypes

export default HelpBlock
