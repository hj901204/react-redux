import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {elementType} from 'react-prop-types'

const propTypes = {
  component: elementType,
  xs: PropTypes.number,
  xsOffset: PropTypes.number,
  xsPull: PropTypes.number,
  sm: PropTypes.number,
  smOffset: PropTypes.number,
  smPull: PropTypes.number,
  md: PropTypes.number,
  mdOffset: PropTypes.number,
  mdPull: PropTypes.number,
  lg: PropTypes.number,
  lgOffset: PropTypes.number,
  lgPull: PropTypes.number
}

const defaultProps = {
  component: 'div'
}

const Col = props => {
  const {
    component: Comp,
    className,
    xs, xsOffset, xsPull,
    sm, smOffset, smPull,
    md, mdOffset, mdPull,
    lg, lgOffset, lgPull,
    ...colProps} = props
  const colClassName = classnames(className, {
    [`col-xs-${xs}`]: xs,
    [`col-xs-offset-${xsOffset}`]: xsOffset,
    [`col-xs-pull-${xsOffset}`]: xsPull,
    [`col-sm-${sm}`]: sm,
    [`col-sm-offset-${smOffset}`]: smOffset,
    [`col-sm-pull-${smOffset}`]: smPull,
    [`col-md-${md}`]: md,
    [`col-md-offset-${mdOffset}`]: mdOffset,
    [`col-md-pull-${mdOffset}`]: mdPull,
    [`col-lg-${lg}`]: lg,
    [`col-lg-offset-${lgOffset}`]: lgOffset,
    [`col-lg-pull-${lgOffset}`]: lgPull
  })
  return <Comp {...colProps} className={colClassName} />
}

Col.propTypes = propTypes
Col.defaultProps = defaultProps

export default Col
