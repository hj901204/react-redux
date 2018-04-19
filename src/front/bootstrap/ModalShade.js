import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Transition from 'react-transition-group/Transition'
import prefixed from './utils/prefixed'

export default class Shade extends React.Component {
  static propTypes = {
    // 显示
    in: PropTypes.bool.isRequired,
    // 动画持续时间 ms
    duration: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        enter: PropTypes.number,
        exit: PropTypes.number
      })
    ]),
    onCancel: PropTypes.func
  }

  static defaultProps = {
    in: false,
    duration: 300,
    onCancel: () => null
  }

  state = {
    style: prefixed({
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      transition: `all 0ms ease`,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 3000,
      display: 'none'
    })
  }

  onEnter = node => {
    node.style.display = ''
  }

  onEntering = node => {
    this.setState({
      style: prefixed({
        ...this.state.style,
        opacity: 1,
        transition: `all ${this.props.duration}ms ease`
      })
    })
  }

  onEntered = node => {}
  onExiting = node => {
    this.setState({
      style: prefixed({
        ...this.state.style,
        opacity: 0,
        transition: `all ${this.props.timeout}ms ease`
      })
    })
  }

  onExited = node => {
    node.style.display = 'none'
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
        {state => {
          return <div style={this.state.style} onClick={this.props.onCancel}/>
        }}
      </Transition>
    )
  }
}
