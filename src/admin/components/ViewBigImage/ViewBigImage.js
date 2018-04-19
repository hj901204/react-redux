import React, {Component} from 'react'
import {FormattedMessage, injectIntl} from 'react-intl'
import { Modal } from 'antd'

class ViewBigImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: ''
    }
  }

  showBig(imgPath) {
    this.setState({
      previewVisible: true,
      previewImage: imgPath
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  render() {
    const { previewVisible, previewImage } = this.state
    const {imgPath} = this.props
    return (
      <div>
        <img onClick={this.showBig.bind(this, imgPath)} src={imgPath} title="点击查看大图" />
        <Modal visible={previewVisible} width="auto" style={{textAlign: 'center', margin: 30}} footer={null} onCancel={this.handleCancel}>
          <img alt="原始图片" style={{ maxWidth: '100%', maxHeight: 600 }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default ViewBigImage
