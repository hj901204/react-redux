import React from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'
import {style, query} from 'dom-helpers'

import prefixed from './utils/prefixed'

export default class ScaleTransition extends React.Component {
  static propTypes = {
    in: PropTypes.bool.isRequired,
    // 动画持续时间 ms
    duration: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        enter: PropTypes.number,
        exit: PropTypes.number
      })
    ])
  }

  static defaultProps = {
    duration: 300
  };

  styles = {
    display: 'none',
    position: 'fixed',
    left: 0,
    top: 0,
    transform: `scale(0.9)`,
    opacity: 0,
    transition: `all 0ms ease`,
    zIndex: 3000
  };

  componentDidMount() {
    this._isMounted = true
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    this._isMounted = false
    window.removeEventListener('resize', this.resize)
  }

  resize = e => {
    if (this.resizeId || !this.props.in) {
      return
    }
    this.resizeId = setTimeout(() => {
      if (!this._isMounted) {
        return
      }

      this.setState({
        style: prefixed({
          ...this.state.style,
          left: (window.innerWidth - this._offsetWidth) / 2,
          top: (window.innerHeight - this._offsetHeight) / 2 - 50
        })
      })
      this.resizeId = null
    }, 100)
  }

  onEnter = node => {
    style(node, {display: ''})
    const height = query.height(node)
    const width = query.width(node)
    const offsetWidth = width < 320 ? 320 : width
    const styles = {
      ...this.styles,
      display: '',
      left: (window.innerWidth - offsetWidth) / 2,
      top: (window.innerHeight - height) / 2 - 50
    }
    style(node, styles)
    this.styles = styles
    this._offsetWidth = width
    this._offsetHeight = height
  }

  onEntering = node => {
    const styles = {
      ...this.styles,
      opacity: 1,
      transform: `scale(1)`,
      transition: `all ${this.props.duration}ms ease`
    }
    this.styles = styles
    setTimeout(() => {
      style(node, styles)
    }, 100)
  }

  onEntered = node => {}
  onExiting = node => {
    const styles = {
      ...this.styles,
      opacity: 0,
      transform: `scale(0.9)`,
      transition: `all ${this.props.timeout}ms ease`
    }
    this.styles = styles
    style(node, styles)
  }

  onExited = node => {
    const styles = {
      ...this.styles,
      display: 'none'
    }
    this.styles = styles
    style(node, styles)
  }

  render() {
    return (
      <Transition
        in={this.props.in}
        timeout={this.props.duration}
        onEnter={this.onEnter}
        onEntering={this.onEntering}
        onEntered={this.onEntered}
        onExiting={this.onExiting}
        onExited={this.onExited}
      >
        {
          state => {
            return (
              <div style={this.styles}>
                {this.props.in ? this.props.children : null}
              </div>
            )
          }
        }
      </Transition>
    )
  }
}
