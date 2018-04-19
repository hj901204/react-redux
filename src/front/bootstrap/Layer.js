import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import canUseDOM from 'dom-helpers/util/inDOM'

import LayerContainer from './LayerContainer'
import Modal from './Modal'

import './Layer.css'

// msg/alert/comfirm/layer

let container = {}

if (canUseDOM) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  container = ReactDOM.render(<LayerContainer />, div)
}

const index = (() => {
  let i = 0
  return () => {
    i += 1
    return `index_${i}`
  }
})()

// 打开一个弹出层
const open = (options) => {
  const opts = Object.assign({
    index: index()
  }, options)

  setTimeout(function() {
    container.add(opts)
  }, 0)
}

// 关闭一个弹出层
const close = index => {
  container.remove(index)
}

// 消息
const msg = (message, callback) => {
  open({
    speed: 2000,
    shade: false,
    iconClose: false,
    className: 'layer-message',
    children: message
  })
}

// alert
const alert = (message, callback) => {
  open({
    children: message,
    className: 'layer-alert',
    btns: [
      {
        text: '确认',
        handle: () => {
          callback && callback()
        }
      }
    ]
  })
}

// confirm 对话框
const confirm = (message, ok, cancel) => {
  open({
    children: message,
    className: 'layer-confirm',
    btns: [
      {
        text: '确认',
        handle: () => {
          ok && ok()
        }
      },
      {
        text: '取消',
        handle: () => {
          cancel && cancel()
        }
      }
    ]
  })
}

const Layer = Modal
Layer.open = open
Layer.close = close
Layer.msg = msg
Layer.alert = alert
Layer.confirm = confirm

export default Layer
