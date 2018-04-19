import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import CarouselItem from './CarouselItem'
import './Carousel.css'

const propTypes = {
  dots: PropTypes.bool, // 显示 dots,
  auto: PropTypes.bool, // 自动播放
  duration: PropTypes.number, // 动画持续时间 ms
  delay: PropTypes.number, // 动画间隔 ms
  animation: PropTypes.string // 动画方式
}

const defaultProps = {
  dots: true,
  auto: true,
  duration: 400,
  delay: 5000,
  animation: ''
}

class Carousel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      itemStyles: this.mapChildrenToStyles(props.children)
    }

    this.isDirectionLeft = true
    this.hendleMouseEnter = this.hendleMouseEnter.bind(this)
    this.hendleMouseLeave = this.hendleMouseLeave.bind(this)
    this.visibilityChange = this.visibilityChange.bind(this)
  }
  componentDidMount() {
    this.autoPlay()
    document.addEventListener('visibilitychange', this.visibilityChange)
  }
  componentWillUnmount() {
    this.timeId && clearTimeout(this.timeId)
    document.removeEventListener('visibilitychange', this.visibilityChange)
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      index: 0,
      itemStyles: this.mapChildrenToStyles(newProps.children)
    })
  }
  visibilityChange() {
    if (document.visibilityState === 'hidden') {
      this.timeId && clearTimeout(this.timeId)
    } else {
      this.autoPlay()
    }
  }
  mapChildrenToStyles(children) {
    return React.Children.map(children, (child, i) => {
      return {
        transform: `translate(${i ? 100 : 0}%, 0)`,
        transition: `all 0s`
      }
    })
  }
  play(i) {
    if (i === this.state.index) return
    const length = this.props.children.length
    let nextIndex = i
    if (nextIndex >= length) { nextIndex = 0 }
    if (nextIndex < 0) { nextIndex = length - 1 }

    const setNextItemStyle = ({index, itemStyles}) => {
      const newItemStyles = itemStyles.map((itemStyle, i) => {
        if (i === nextIndex) {
          return {
            transform: `translate(${this.isDirectionLeft ? '' : '-'}100%, 0)`,
            transition: `all 0ms`
          }
        }

        return itemStyle
      })

      return {
        itemStyles: newItemStyles
      }
    }

    const setItemsStyle = ({index, itemStyles}) => {
      const {duration, animation} = this.props
      const newItemStyles = itemStyles.map((itemStyle, i) => {
        if (index === i) {
          return {
            transform: `translate(${this.isDirectionLeft ? '-' : ''}100%, 0)`,
            transition: `all ${duration}ms ${animation}`
          }
        }
        if (i === nextIndex) {
          return {
            transform: `translate(0, 0)`,
            transition: `all ${duration}ms ${animation}`
          }
        }
        return itemStyle
      })
      return {
        itemStyles: newItemStyles,
        index: nextIndex
      }
    }

    this.setState(setNextItemStyle)
    this.playId && clearTimeout(this.playId)
    this.playId = setTimeout(() => {
      this.setState(setItemsStyle, () => this.autoPlay())
    }, 30)
  }
  autoPlay() {
    const {auto, delay, duration} = this.props
    if (!auto) return

    this.timeId && clearTimeout(this.timeId)

    this.timeId = setTimeout(() => {
      this.play(this.state.index + 1)
    }, delay + duration)
  }
  handleDots(i) {
    this.isDirectionLeft = i > this.state.index
    this.play(i)
  }
  hendleMouseEnter() {
    this.isMouseEnter = true
    this.timeId && clearTimeout(this.timeId)
  }
  hendleMouseLeave() {
    this.isMouseEnter = false
    this.autoPlay()
  }
  renderDots() {
    const { index } = this.state
    if (!this.props.dots) return null
    return (
      <div className="carousel-index">
        {
          this.props.children.map((child, i) => {
            return (
              <span className={i === index ? 'active' : ''}
                key={i} onClick={() => this.handleDots(i)}/>
            )
          })
        }
      </div>
    )
  }
  renderItem() {
    const {index, itemStyles} = this.state
    const {children} = this.props

    return React.Children.map(children, (child, i) => {
      const newProps = {...child.props, style: {...child.props.style, ...itemStyles[i]}}
      return React.cloneElement(child, newProps)
    })
  }
  renderBtns() {
    return (
      <span></span>
    )
  }
  render() {
    return (
      <div className="carousel-wrap"
        style={this.props.style}
        onMouseEnter={this.hendleMouseEnter}
        onMouseLeave={this.hendleMouseLeave}>
        {this.renderItem()}
        {this.renderDots()}
      </div>
    )
  }
}

Carousel.propTypes = propTypes
Carousel.defaultProps = defaultProps

Carousel.item = CarouselItem

export default Carousel
