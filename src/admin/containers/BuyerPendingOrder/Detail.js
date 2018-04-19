import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from '../../components/Framework'
import { peddingOrderOne } from '../../redux/models/buyerPendingOrders'
import next from '../../lib/request/next'
import DetailOrderFlow from './DetailOrderFlow'
import DetailOrderInfo from './DetailOrderInfo'
import DetailGoodsInfo from './DetailGoodsInfo'
import DetailCountInfo from './DetailCountInfo'

import styles from './Detail.css'
class Detail extends Component {
  componentReload() {
    this.loadData()
  }

  componentDidMount() {
    this._isMounted = true
    this.loadData()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  loadData = () => {
    this.orderCode = this.props.match.params.orderCode
    this.props.peddingOrderOne({ orderCode: this.orderCode }).catch(next)
  }

  render() {
    const { buyerPendingOrder } = this.props
    const order = buyerPendingOrder.byId[this.orderCode] || {}
    return (
      <div className={styles.container}>
        <DetailOrderFlow order={order} />
        <div className={styles.content}>
          <DetailOrderInfo order={order} />
          <DetailGoodsInfo order={order} />
          <DetailCountInfo order={order} />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ buyerPendingOrder }) {
  return {
    buyerPendingOrder
  }
}

function mapDispatchToProps(dispatch) {
  return {
    peddingOrderOne: bindActionCreators(peddingOrderOne, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)
