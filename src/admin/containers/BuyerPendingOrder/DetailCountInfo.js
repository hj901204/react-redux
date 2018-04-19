import React from 'react'
import {priceObj} from '../../lib/dataUtils'
import styles from './DetailCountInfo.css'

const DetailCountInfo = props => {
  const {order} = props
  const priceInfo = order.goodsDetail && order.goodsDetail.length > 0 ? (priceObj[order.goodsDetail[0].deliveryWarehouse] || {}) : {}
  return (
    <div className={styles.totalInfo}>
      <div><span>材料费：</span>¥{priceInfo.materialPrice}</div>
      <div><span>加工费：</span>¥{priceInfo.processPrice}</div>
      <div><span>运费：</span>¥{priceInfo.transportPrice}</div>
      <div><span>管理费：</span>¥{priceInfo.managePrice}</div>
      <div className={styles.price}><span>合计：</span>¥{priceInfo.totalPrice}</div>
    </div>
  )
}

export default DetailCountInfo
