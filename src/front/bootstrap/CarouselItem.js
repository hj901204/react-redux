import React from 'react'
import {elementType} from 'react-prop-types'
import classnames from 'classnames'

import prefixed from './utils/prefixed'

import './Carousel.css'

const propTypes = {
  component: elementType
}

const defaultProps = {
  component: 'div'
}

const CarouselItem = props => {
  const {component: Comp, className, style, ...itemProps} = props
  const itemClassName = classnames('carousel-item', className)
  const itemStyle = prefixed(style)
  return <Comp {...itemProps} className={itemClassName} style={itemStyle} />
}

CarouselItem.propTypes = propTypes
CarouselItem.defaultProps = defaultProps

export default CarouselItem
