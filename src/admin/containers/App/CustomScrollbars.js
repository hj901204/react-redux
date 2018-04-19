import React from 'react'
import {Scrollbars} from 'react-custom-scrollbars'
import styles from './App.css'

const CustomScrollbars = props => {
  if (props.invisible) {
    return <div>{props.children}</div>
  }
  return <Scrollbars className={styles.crollBar} autoHide children={props.children} />
}

export default CustomScrollbars
