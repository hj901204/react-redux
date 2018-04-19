import React from 'react'
import {Button} from '../../bootstrap'

import styles from './SubmitButton.css'

const SubmitButton = props => {
  return <Button {...props} className={styles.submit}/>
}

export default SubmitButton
