import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Top from '../NewHeader/Top'
import IndexHeader from '../NewHeader/IndexHeader'
import LargeScreenComp from './LargeScreenComp'
import {orderList, totalData} from '../../redux/modules/largeScreen'
class LargeScreen extends React.Component {
  componentDidMount = () => {
    let param = {keyword: '', orderStatus: '', orderType: 'desc', pageIndex: 1, pageSize: 4, submitDateEnd: '', submitDateStart: ''}
    this.props.totalData()
    this.props.orderList(param).then(() => {
      setInterval(this.props.orderList, 5000, param)
      setInterval(this.props.totalData, 5000)
    })
  }
  render() {
    return (
      <div>
        <LargeScreenComp {...this.props.largeScreen}/>
      </div>
    )
  }
}
const mapStateToProps = ({largeScreen}) => ({largeScreen})

const mapDispatchToProps = dispatch => {
  return {
    orderList: bindActionCreators(orderList, dispatch),
    totalData: bindActionCreators(totalData, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LargeScreen)
