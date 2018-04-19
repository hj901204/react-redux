import React from 'react'
import classnames from 'classnames'

import styles from './Legend.css'

const Legend = props => {
  return (
    <div className={styles.wrap}>
      <div className="container">
        <img className={styles.img1} src="/images/newIndex/flow.png"/>
        <a className={styles.item}
          href="tencent://message/?uin=1161165158&Site=www.xxx.com&Menu=yes" title="在线咨询">
          <img className={styles.img2} src="/images/newIndex/service.png"/>
        </a>
      </div>
    </div>
  )
}

export default Legend
