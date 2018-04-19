import React, {Component} from 'react'
import classnames from 'classnames'
import OrderSteps from './OrderSteps'
import {formateNumberDateTime} from '../../lib/utils'
import styles from './DetailOrderFlow.css'

class DetailOrderFlow extends Component {
  getFlowTime = (status) => {
    const {transtates} = this.props.order
    if (transtates && transtates.length > 0) {
      const curTrans = transtates.find(item => item.state_describe === status)
      if (curTrans) {
        return formateNumberDateTime(curTrans.state_time * 1000)
      }
    }
    return ''
  }
  render() {
    const {order} = this.props
    const step = order.orderStatus
      ? (order.orderStatus === '13'
        ? 3 : order.orderStatus === '3'
          ? 4 : order.orderStatus === '9'
            ? 5 : order.orderStatus === '14'
              ? 6 : order.orderStatus === '10'
                ? 7 : order.orderStatus === '11'
                  ? 8 : (['4', '5', '6', '7', '8'].includes(order.orderStatus) ? 4.5 : +order.orderStatus)) : 0
    const childStep = order.orderStatus
      ? (order.orderStatus === '4'
        ? 1 : order.orderStatus === '5'
          ? 2 : order.orderStatus === '6'
            ? 3 : order.orderStatus === '7'
              ? 4 : order.orderStatus === '8'
                ? 5 : (['1', '2', '13', '3'].includes(order.orderStatus) ? 0 : 5.5)) : 0
    return (
      <div className={styles.container}>
        <OrderSteps step={step} type="center">
          <OrderSteps.Item icon="1" isTextUp title="提交定制" time={this.getFlowTime('1')} />
          <OrderSteps.Item icon="2" isTextUp title="已确认" time={this.getFlowTime('2')} />
          <OrderSteps.Item icon="3" isTextUp title="已付定金" time={this.getFlowTime('13')} />
          <OrderSteps.Item icon="4" isTextUp title="已计划" time={this.getFlowTime('3')}/>
          <OrderSteps.Item icon="5" isTextUp title="生产完工" time={this.getFlowTime('9')} />
          <OrderSteps.Item icon="6" isTextUp title="已付尾款" time={this.getFlowTime('14')} />
          <OrderSteps.Item icon="7" isTextUp title="待收货" time={this.getFlowTime('10')} />
          <OrderSteps.Item icon="8" isTextUp title="确认收货" time={this.getFlowTime('11')} />
        </OrderSteps>
        <span className={classnames(styles.chld, {[styles.seledChld]: childStep > 0})}></span><span className={styles.chldText}>生产制造</span>
        <OrderSteps step={childStep} className={styles.prodCld} type="center">
          <OrderSteps.Item icon="1" title="开始生产" time={this.getFlowTime('4')}/>
          <OrderSteps.Item icon="2" title="打磨" time={this.getFlowTime('5')}/>
          <OrderSteps.Item icon="3" title="压印" time={this.getFlowTime('6')}/>
          <OrderSteps.Item icon="4" title="气动压印" time={this.getFlowTime('7')}/>
          <OrderSteps.Item icon="5" title="检验" time={this.getFlowTime('8')}/>
        </OrderSteps>
      </div>
    )
  }
}

export default DetailOrderFlow
