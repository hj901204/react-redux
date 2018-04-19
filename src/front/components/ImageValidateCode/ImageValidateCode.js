import React from 'react'

class ImageValidateCode extends React.Component {
  state = {
    key: Date.now() + ''
  };

  componentDidMount() {
    this.refresh()
  }

  refresh = () => {
    const key = Date.now() + ''
    if (this.props.onChange) {
      this.props.onChange(key)
    }
    this.setState({key})
    return key
  }

  render() {
    const src = `/api/purchaser/cloudcut/user/captchaImage?key=${this.state.key}`
    return (
      <img src={src} onClick={this.refresh}/>
    )
  }
}

export default ImageValidateCode
