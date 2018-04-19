import React from 'react'
import PropTypes from 'prop-types'
import {Button} from '../../bootstrap'

const propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  count: PropTypes.number,
  text: PropTypes.string
}

const defaultProps = {
  onClick: () => null,
  count: 60,
  disabled: false,
  text: '获取短信验证码'
}

class Countdown extends React.Component {
  state = {
    num: this.props.count,
    disabled: false
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  handleClick = (e) => {
    this.props.onClick()
    this.setState({
      disabled: true,
      num: this.state.num - 1
    })
    this.timer = setInterval(() => {
      let disabled = this.state.disabled
      let num = this.state.num - 1
      if (num < 0) {
        disabled = false
        num = this.props.count
        clearInterval(this.timer)
      }
      this.setState({num, disabled})
    }, 1000)
  }

  render() {
    const {count, text, disabled, ...props} = this.props

    return (
      <Button
        {...props}
        type="button"
        disabled={this.state.disabled || disabled}
        className={this.props.className}
        onClick={this.handleClick}
      >{this.state.num !== count ? this.state.num + '秒后重发' : text}</Button>
    )
  }
}

Countdown.propTypes = propTypes
Countdown.defaultProps = defaultProps

export default Countdown
