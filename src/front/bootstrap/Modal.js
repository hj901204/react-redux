import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ModalTransition from './ModalTransition'
import ModalShade from './ModalShade'

import './Modal.css'

export default class Modal extends React.Component {
  static propTypes = {
    // 显示
    in: PropTypes.bool,
    // 动画持续时间 ms
    duration: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        enter: PropTypes.number,
        exit: PropTypes.number
      })
    ]),
    // 遮罩显示
    shade: PropTypes.bool,
    shadeClose: PropTypes.bool,
    // 样式
    style: PropTypes.object,
    // className
    className: PropTypes.string,
    // 关闭回调
    onCancel: PropTypes.func,
    // 标题
    title: PropTypes.string,
    // 按钮组
    btns: PropTypes.array,
    // 关闭图标
    iconClose: PropTypes.bool
  }

  static defaultProps = {
    in: false,
    duration: 300,
    shade: true,
    shadeClose: true,
    iconClose: true,
    onCancel: () => null,
    btns: []
  }

  componentDidMount() {
    // 自动关闭定时器
    if (this.props.speed) {
      this.timeId = setTimeout(() => {
        this.props.onCancel(this.props.index)
      }, this.props.speed)
    }
  }

  componentWillUnmount() {
    // 组件销毁时清除定时器
    this.timeId && clearTimeout(this.timeId)
  }

  shadeClick = (e) => {
    e.stopPropagation()
    this.props.shadeClose && this.props.onCancel(this.props.index)
  }

  renderFooter() {
    const { btns } = this.props
    if (!btns.length) {
      return null
    }

    return (
      <div className="bs-modal-footer">
        {
          btns.map((btn, index) => {
            let handle = () => {
              if (btn.handle === false || btn.handle() === false) {
                return
              }
              this.props.onCancel(this.props.index)
            }
            let className = classnames('btn', 'btn-sm', {
              'btn-primary': !index
            })
            return <button className={className} key={index} autoFocus onClick={ handle } type="button">{btn.text}</button>
          })
        }
      </div>
    )
  }

  render() {
    const { children, title, shade, style, iconClose, className } = this.props

    return (
      <div>
        {shade ? <ModalShade in={this.props.in} onClick={this.shadeClick}/> : null}
        <ModalTransition in={this.props.in} >
          <div className={classnames('bs-modal-wrap', className)} style={style}>
            {iconClose ? <a onClick={this.props.onCancel} className={'bs-modal-close'} title="关闭"/> : null}
            {
              title ? <div className={'bs-modal-header'}>{title}</div> : null
            }
            <div className={'bs-modal-body'}>
              {this.props.children}
            </div>
            {this.renderFooter()}
          </div>
        </ModalTransition>
      </div>
    )
  }
}
