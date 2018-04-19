import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const propTypes = {
  component: PropTypes.node,
  fluid: PropTypes.bool
}

const defaultProps = {
  component: 'div',
  fluid: false
}

const Grid = props => {
  const {component: Comp, className, fluid, ...gridProps} = props
  const gridClassName = classnames(className, {
    'container': !fluid,
    'container-fluid': fluid
  })
  return <Comp {...gridProps} className={gridClassName} />
}

Grid.propTypes = propTypes
Grid.defaultProps = defaultProps

export default Grid
