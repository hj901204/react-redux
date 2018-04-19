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

const Row = props => {
  const {component: Comp, className, ...rowProps} = props
  const rowClassName = classnames('row', className)
  return <Comp {...rowProps} className={rowClassName} />
}

Row.propTypes = propTypes
Row.defaultProps = defaultProps

export default Row
