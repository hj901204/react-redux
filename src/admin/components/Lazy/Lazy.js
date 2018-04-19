import React, { Component } from 'react'
import {Spin} from 'antd'

const Loading = props => {
  return (
    <div style={{textAlign: 'center', padding: 20}}><Spin /> 正在加载...</div>
  )
}

class Lazy extends Component {
  state = {
    Comp: null
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      Comp: null
    })
    props.load()
      .then(Comp => {
        this.setState({
          Comp: Comp.default ? Comp.default : Comp
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return this.state.Comp ? this.props.children(this.state.Comp) : <Loading />
  }
}

export default Lazy
