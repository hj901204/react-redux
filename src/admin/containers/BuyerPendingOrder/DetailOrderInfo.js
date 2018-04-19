import React from 'react'
import {Row, Col, Icon} from 'antd'
import {getOrderStatusName} from '../../lib/dataUtils'

import styles from './DetailOrderInfo.css'

const DetailOrderInfo = props => {
  const {order} = props
  const status = '订单状态：' + getOrderStatusName(order.orderStatus)
  let arrAdd
  if (order.address) {
    arrAdd = order.address.split(',')
  }
  return (
    <Row className={styles.container}>
      <Row className={styles.status}>
        <span className={styles.text}>{status}</span>
      </Row>
      <Row className={styles.content}>
        <Row className={styles.row}>
          <Col span={1}></Col>
          <Col span={7}>订单编号：{order.orderCode}</Col>
          <Col span={7}>公司名称：{arrAdd && arrAdd.length > 2 ? arrAdd[2] : ''}</Col>
          <Col span={7}>取货口：{order.receiveUnit}</Col>
        </Row>
        <Row className={styles.row}>
          <Col span={1}></Col>
          <Col span={7}>收货姓名：{arrAdd && arrAdd.length > 1 ? arrAdd[1] : ''}</Col>
          <Col span={7}>收货电话：{arrAdd && arrAdd.length > 0 ? arrAdd[0] : ''}</Col>
        </Row>
      </Row>
    </Row>
  )
}

export default DetailOrderInfo
