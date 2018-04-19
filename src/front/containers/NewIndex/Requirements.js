import React from 'react'
import classnames from 'classnames'
import {Link} from 'react-router-dom'
import HostLink from '../../components/HostLink'

import styles from './Requirements.css'

const Requirements = props => {
  const {className} = props
  return (
    <section className={styles.wrap}>
      <div className={classnames('container', styles.container)}>
        <div className="col-md-1"></div>
        <div className={classnames('col-md-4', styles.requirementInfo)}>
          <h1 className={styles.text}>需求方询价</h1>
          <p>交付期时限太短？不允许浪费时间，</p>
          <p>客户一对一服务。</p>
        </div>
        <div className={styles.img}>
          <img src="/images/newIndex/computer.png"/>
        </div>
      </div>
    </section>
  )
}

export default Requirements
