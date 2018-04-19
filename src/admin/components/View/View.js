import React from 'react'
import {Scrollbars} from 'react-custom-scrollbars'

const View = props => {
  if (!props.scroll) {
    return <div style={props.style}>{props.children}</div>
  }
  return (
    <Scrollbars>
      <div style={props.style}>{props.children}</div>
    </Scrollbars>
  )
}

View.defaultProps = {
  scroll: false,
  style: {padding: 20}
}

export default View
