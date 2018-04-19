import React from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import _remove from 'lodash/remove'
import _isEmpty from 'lodash/isEmpty'
import Modal from './Modal'

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      increase: false,
      indexs: [],
      layers: {}
    }
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
  }

  add(props) {
    const layers = {
      ...this.props.layers,
      [props.index]: props
    }
    this.setState({ layers, increase: true })
    // document.body.style.height = '100%'
    // document.body.style.overflow = 'hidden'
  }
  remove(index) {
    let { layers } = this.state
    let props = layers[index]
    if (!props) { return }

    delete layers[index]
    props.onClose && props.onClose()

    this.setState({ layers, increase: false })

    if (_isEmpty(layers)) {
      // document.body.style.height = ''
      // document.body.style.overflow = ''
    }
  }
  renderLayers() {
    const { layers } = this.state

    return Object.keys(layers).map((key, i) => {
      return <Modal key={key} {...layers[key]} onCancel={this.remove.bind(this, key)} />
    })
  }
  render() {
    return (
      <TransitionGroup component="div">
        { this.renderLayers() }
      </TransitionGroup>
    )
  }
}

export default Container
