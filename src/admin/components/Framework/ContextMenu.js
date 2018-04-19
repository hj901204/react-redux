import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import styles from './ContextMenu.css'

class ContextMenu extends React.Component {
  static propTypes = {
    menu: PropTypes.array.isRequired
  }

  onContextMenuChange = (e) => {
    const disabled = e.currentTarget.getAttribute('disabled')
    if (disabled) {
      return
    }
    this.props.onContextMenuReload()
  }

  renderContext = (item, index = 0) => {
    if (Array.isArray(item)) {
      return (
        <div className={styles.contextgroup} key={index}>
          {item.map(this.renderContext)}
        </div>
      )
    }
    return (
      <a href="javascript:;"
        key={index}
        className={styles.contextitem}
        {...item}/>
    )
  }

  stopPropagation(e) {
    e.stopPropagation()
    e.preventDefault()
  }

  render() {
    const {menu, postion, show} = this.props
    if (!show) {
      return null
    }

    return (
      <div className={styles.contextmenu}
        onClick={this.stopPropagation}
        style={postion}>
        {this.renderContext(menu)}
      </div>
    )
  }
}

export default ContextMenu
