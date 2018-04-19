import React, { Component } from 'react'
import { Table, Button } from 'antd'
import { Link } from '../../components/Framework'
import {pageOptions} from '../../lib/helpers'
import {getOrderStatusName, getImgByCode, priceObj} from '../../lib/dataUtils'
import {formateNumberDateTime} from '../../lib/utils'
import styles from './OrderList.css'

class OrderList extends Component {
  renderContent = (value, row, index) => {
    return {
      children: value,
      props: { colSpan: 0 }
    }
  }

  operateOrder = (e) => {
    const eTarget = e.target
    eTarget.disabled = true
    setTimeout(() => { eTarget.disabled = false }, 3000)
    const oprStatus = e.target.getAttribute('data-opr')
    const orderCode = e.target.getAttribute('data-ordercode')
    if (this.props.operateOrder) {
      this.props.operateOrder(orderCode, oprStatus)
    }
  }

  expandedRowRender = (detail) => {
    const columns = [
      {
        title: '订单信息',
        dataIndex: 'number',
        key: 'number',
        width: 220,
        align: 'center',
        render: (value, record, index) => {
          if (record && record.goodsDetail && record.goodsDetail.length > 0) {
            const goods = record.goodsDetail[0]
            return <div style={{maxWidth: 150}}>
              <p><img src={getImgByCode(goods.deliveryWarehouse)} className={styles.proimg}/></p>
              <p>印字信息：{goods.matchName}</p>
            </div>
          }
        }
      },
      {
        title: '收货人',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
        width: 150,
        render: (value, record, index) => {
          if (value) {
            const arrAdd = value.split(',')
            return <span><p>{arrAdd[0]}</p><p>{arrAdd[1]}</p></span>
          }
          return ''
        }
      },
      { title: '价格',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        align: 'center',
        width: 150,
        render: (value, record, index) => {
          if (record && record.goodsDetail && record.goodsDetail.length > 0) {
            const goods = record.goodsDetail[0]
            return priceObj[goods.deliveryWarehouse] ? ('¥ ' + priceObj[goods.deliveryWarehouse].totalPrice) : ''
          }
        }
      },
      {
        title: '实付款',
        dataIndex: 'payMent',
        key: 'payMent',
        align: 'center',
        width: 150,
        render: (value, record, index) => {
          if (record && record.goodsDetail && record.goodsDetail.length > 0) {
            const goods = record.goodsDetail[0]
            const totalPrice = priceObj[goods.deliveryWarehouse] ? priceObj[goods.deliveryWarehouse].totalPrice : 0
            return (<div>
              <p>定金：¥ {totalPrice ? (totalPrice * 0.3).toFixed(2) : ''}</p>
              <p>尾款：¥ {totalPrice ? (totalPrice * 0.7).toFixed(2) : ''}</p>
            </div>)
          }
        }
      },
      {
        title: '交易状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        align: 'center',
        width: 120,
        render: (value, record, index) => {
          return <div>
            <p>{getOrderStatusName(value)}</p>
            <Link to={'/buyerPendingOrder/detail/' + record.orderCode} title="订单详情">订单详情</Link>
          </div>
        }
      },
      {
        title: '交易操作',
        dataIndex: 'opr',
        key: 'opr',
        align: 'center',
        width: 120,
        render: (value, record, index) => {
          return record.orderStatus === '1' ? <Button type="primary" size="small" data-opr="2" data-ordercode={record.orderCode} onClick={this.operateOrder} >确认订单</Button>
            : record.orderStatus === '10' ? <Button type="primary" size="small" data-opr="11" data-ordercode={record.orderCode} onClick={this.operateOrder} >确认收货</Button> : null
        }
      }
    ]
    detail.key = detail.orderCode + '100'
    const list = [detail]
    return (
      <Table columns={columns} dataSource={list} pagination={false} showHeader={false} />
    )
  }

  render() {
    const { list, total, pageSize, pageIndex, search, changePageSize } = this.props
    const columns = [
      {
        title: '订单信息',
        dataIndex: 'submitTime',
        key: 'submitTime',
        width: 220,
        render: (text, record, index) => {
          return {
            children: <div className={styles.outerRowCont}>
              <span>{formateNumberDateTime(text)}</span>
              <span>订单号：{record.orderCode}</span>
              <span>出货口：{record.receiveUnit}</span>
            </div>,
            props: {
              colSpan: 8
            }
          }
        }
      },
      { title: '收货人', dataIndex: 'consignee', key: 'consignee', width: 150, render: this.renderContent },
      { title: '价格', dataIndex: 'number1', key: 'number1', width: 150, render: this.renderContent },
      { title: '实付款', dataIndex: 'number2', key: 'number2', width: 150, render: this.renderContent },
      { title: '交易状态', dataIndex: 'number3', key: 'number3', width: 120, render: this.renderContent },
      { title: '交易操作', dataIndex: 'number4', key: 'number4', width: 120, render: this.renderContent }
    ]
    return (
      <Table dataSource={list} className={styles.tbBorder} columns={columns} rowKey="orderCode"
        expandedRowRender={this.expandedRowRender} defaultExpandAllRows showHeader={false}
        pagination={{
          defaultPageSize: pageSize,
          current: pageIndex,
          onChange: search,
          total: total ? +total : length
        }} />
    )
  }
}

export default OrderList
