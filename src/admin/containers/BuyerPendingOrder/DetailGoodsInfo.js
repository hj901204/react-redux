import React from 'react'
import { Table, Button } from 'antd'
import { getImgByCode, getCusImgByCode, getGoodsCodeByCode, getGoodsNameImgByCode } from '../../lib/dataUtils'
import styles from './DetailGoodsInfo.css'

const DetailGoodsInfo = props => {
  const { order } = props
  const columns = [
    {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      width: 200,
      render: (value, record, index) => {
        return <img src={getImgByCode(record.deliveryWarehouse)} className={styles.proimg}/>
      }
    },
    {
      title: '商品编码',
      dataIndex: 'goodsCode',
      key: 'goodsCode',
      width: 100,
      render: (value, record, index) => getGoodsCodeByCode(record.deliveryWarehouse)
    },
    {
      title: '商品名称',
      dataIndex: 'specFormat',
      key: 'specFormat',
      width: 100,
      render: (value, record, index) => getGoodsNameImgByCode(record.deliveryWarehouse)
    },
    {
      title: '自定义图案',
      dataIndex: 'deliveryWarehouse',
      key: 'deliveryWarehouse',
      width: 200,
      render: (value, record, index) => {
        return <img src={getCusImgByCode(value)} className={styles.proimg}/>
      }
    },
    {
      title: '印字信息',
      dataIndex: 'matchName',
      key: 'matchName',
      width: 120
    },
    {
      title: '数量',
      dataIndex: 'nums',
      key: 'nums',
      width: 80
    }
  ]

  return (
    <div className={styles.container}>
      {order.goodsDetail && order.goodsDetail.length ? <Table className={styles.table} rowKey="id" columns={columns} dataSource={order.goodsDetail}
        pagination={false} /> : '暂无数据'}
    </div>
  )
}

export default DetailGoodsInfo
