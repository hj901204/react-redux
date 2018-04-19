import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import { message } from 'antd'
import { Link, connect } from '../../components/Framework'
import { peddingOrderList, peddingOrderOPerate } from '../../redux/models/buyerPendingOrders'
import { getListByIds } from '../../lib/helpers'
import next from '../../lib/request/next'
import Search from './Search'
import OrderList from './OrderList'
import styles from './BuyerPendingOrder.css'

class BuyerPendingOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageIndex: 1,
      pageSize: 20,
      query: {
        orderStatus: '',
        submitDateEnd: '',
        submitDateStart: '',
        keyword: '',
        orderType: 'desc'
      }
    }
  }

  componentReload() {
    this.load()
  }

  componentDidMount() {
    this._isMounted = true
    this.load()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  load = () => {
    this.search(this.state.pageIndex)
  }

  search = (pageIndex = 1) => {
    const { pageSize, query } = this.state
    const params = { pageIndex, pageSize, ...query }

    this.props.peddingOrderList(params)
      .then((action) => {
        if (this._isMounted) {
          this.setState({ pageIndex })
        }
      })
      .catch(next)
  }

  changeInput = (query) => {
    this.setState({
      query: {
        ...this.state.query,
        ...query
      }
    }, () => {
      this.search()
    })
  }

  searchQuery = () => {
    this.search()
  }
  changePageSize = (current, size) => {
    this.setState({
      pageSize: size
    }, this.search)
  }

  operateOrder = (orderCode, status) => {
    this.props.peddingOrderOPerate({ orderCode, status })
      .then((action) => {
        message.success((status === '2' ? '确认订单' : '确认收货') + '成功！')
        if (this._isMounted) {
          this.load()
        }
      })
      .catch(next)
  }

  render() {
    const { buyerPendingOrder, user } = this.props
    const { pageSize, pageIndex, query } = this.state
    const dataSource = getListByIds(buyerPendingOrder.byId, buyerPendingOrder.allIds)
    return (
      <div className={styles.container} ref="container">
        <Search searchQuery={this.searchQuery} changeInput={this.changeInput} query={query} />
        <div className={styles.header}>
          <table className={styles.ht}>
            <thead>
              <tr>
                <th className={classnames(styles.one)}></th>
                <th className={classnames(styles.two)}>订单信息</th>
                <th className={classnames(styles.three)}>收货人</th>
                <th className={classnames(styles.four)}>价格</th>
                <th className={classnames(styles.five)}>实付款</th>
                <th className={classnames(styles.six)}>交易状态</th>
                <th className={classnames(styles.seven)}>交易操作</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className={styles.table}>
          {dataSource && dataSource.length ? <OrderList list={dataSource}
            total={buyerPendingOrder.total}
            operateOrder={this.operateOrder}
            changePageSize={this.changePageSize}
            pageSize={pageSize}
            pageIndex={pageIndex}
            search={this.search}
          /> : <p className={styles.noData}>暂无数据</p>}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ buyerPendingOrder, user }) {
  return {
    buyerPendingOrder,
    user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    peddingOrderList: bindActionCreators(peddingOrderList, dispatch),
    peddingOrderOPerate: bindActionCreators(peddingOrderOPerate, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerPendingOrder)
