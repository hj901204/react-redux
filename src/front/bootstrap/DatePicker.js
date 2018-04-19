import React from 'react'
import PropTypes from 'prop-types'
import RcDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'moment/locale/zh-cn'
import classnames from 'classnames'
import moment from 'moment'
import FormControl from './FormControl'

import './DatePicker.css'

const propTypes = {
  dateFormat: PropTypes.string,
  timeFormat: PropTypes.bool,
  closeOnSelect: PropTypes.bool
}

const defaultProps = {
  dateFormat: 'YYYY-MM-DD',
  timeFormat: false,
  closeOnSelect: true
}

class DatePicker extends React.Component {
  state = {
    value: this.props.value
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value})
    }
  }

  handleChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
    this.setState({value})
  }

  render() {
    const {placeholder, onChange, value, ...dateProps} = this.props
    return (
      <RcDatePicker
        {...dateProps}
        placeholderText={placeholder}
        selected={this.state.value}
        onChange={this.handleChange}
      />
    )
  }
}

const DatePickerControl = props => {
  const {className, ...controlProps} = props
  return (
    <div className={classnames('datepicker-wrap', className)}>
      <FormControl
        {...controlProps}
        component={DatePicker}
        className={classnames('datepicker-datetime', className)}
      />
    </div>
  )
}

DatePicker.propTypes = propTypes
DatePicker.defaultProps = defaultProps

export default DatePickerControl
