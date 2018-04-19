import React, { Component } from 'react'
import { Button, Input, Select, DatePicker } from 'antd'
import moment from 'moment'
import {orderStatus as statusObj} from '../../lib/dataUtils'
import styles from './Search.css'

const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD HH:mm:ss'

class Search extends Component {
  bindSearchParam = (e) => {
    if (this.props.changeInput) {
      this.props.changeInput({ keyword: e.target.value })
    }
  }

  bindDate = (dates, dateStrings) => {
    if (this.props.changeInput) {
      this.props.changeInput({
        submitDateEnd: dates && dates.length > 0 ? dates[0].format(dateFormat) : '',
        submitDateStart: dates && dates.length > 1 ? dates[1].format(dateFormat) : ''
      })
    }
  }

  handleChange = (value) => {
    if (this.props.changeInput) {
      this.props.changeInput({ orderStatus: value })
    }
  }

  searchQuery = () => {
    if (this.props.searchQuery) {
      this.props.searchQuery()
    }
  }
  render() {
    const { submitDateEnd, submitDateStart, orderStatus, keyword } = this.props.query
    return (
      <div className={styles.search}>
        <div className={styles.left}>
          <span className={styles.datetitle}>成交时间：</span>
          <RangePicker
            style={{ width: 270 }}
            format={dateFormat}
            placeholder={['开始时间', '结束时间']}
            allowClear
            showTime format="YYYY-MM-DD HH:mm:ss"
            onChange={this.bindDate}
          />
        </div>
        <div className={styles.right}>
          <span className={styles.datetitle}>交易状态：</span>
          <Select value={orderStatus} style={{ fontSize: 14 }} style={{ width: 120 }} onChange={this.handleChange}>
            <Select.Option value="">所有</Select.Option>
            {
              Object.keys(statusObj).map((key, index) => {
                return <Select.Option key={key} value={key}>{statusObj[key]}</Select.Option>
              })
            }
          </Select>
          <Input className={styles.keyInput} placeholder="订单号" maxLength="50" onPressEnter={this.searchQuery} onChange={this.bindSearchParam} />
          <Button className={styles.searchBtn} type="primary" icon="search" onClick={this.searchQuery} />
        </div>
      </div>
    )
  }
}

export default Search
