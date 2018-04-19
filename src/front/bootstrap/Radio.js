import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {elementType} from 'react-prop-types'

const RadioComponent = props => {
  const {inline, children, ...radioProps} = props
  const radioClassName = classnames({
    'radio': !inline,
    'radio-inline': inline,
    'disabled': props.disabled
  })

  const label = (
    <label className={inline ? radioClassName : ''}>
      <input type="radio" {...radioProps}/> {children}
    </label>
  )

  return inline ? label : <div className={radioClassName}>{label}</div>
}

const propTypes = {
  component: elementType
}

const defaultProps = {
  component: RadioComponent
}

const contextTypes = {
  _field: PropTypes.object
}

const Radio = (props, context) => {
  const {component: Comp, ...radioProps} = props
  const input = context._field ? context._field.input : null
  const radio = {}
  if (input) {
    radio.onChange = e => {
      if (props.onChange) {
        props.onChange(e)
      }
      input.onChange(e)
    }
    radio.name = input.name
    radio.checked = props.value === input.value
  }

  return <Comp {...radioProps} {...radio}/>
}

Radio.propTypes = propTypes
Radio.defaultProps = defaultProps
Radio.contextTypes = contextTypes

export default Radio
