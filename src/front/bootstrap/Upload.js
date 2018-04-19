import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import RcUpload from 'rc-upload'
import {elementType} from 'react-prop-types'

const propTypes = {
  component: elementType,
  // 是否多选
  multiple: PropTypes.bool,
  // 上传URL
  action: PropTypes.string.isRequired,
  // 上传参数
  data: PropTypes.object,
  // 上传成功
  onSuccess: PropTypes.func
}

const defaultProps = {
  multiple: false,
  action: '/api/filesvc/fileservice/filechunkUpload',
  data: {
    destDir: '/yuncut/import/',
    rename: true
  },
  onSuccess: values => values
}

const contextTypes = {
  _field: PropTypes.object
}

const Upload = (props, context) => {
  const {component: Comp, onSuccess, ...uploader} = props
  const input = context._field ? context._field.input : null
  const onChange = (result) => {
    if (typeof result === 'string') {
      try {
        result = JSON.parse(result)
      } catch (e) {
        console.error('Upload response JSON parse failed', e)
      }
    }
    const list = result.map((value, index) => {
      const item = JSON.parse(value)
      return {
        path: props.data.destDir + item.newFilename,
        filename: item.originalFilename
      }
    })
    const values = onSuccess(props.multiple ? list : list[0])
    if (input) {
      input.onChange(values)
    }
  }

  return <RcUpload {...uploader} onSuccess={onChange} />
}

Upload.propTypes = propTypes
Upload.defaultProps = defaultProps
Upload.contextTypes = contextTypes

export default Upload
