import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import styles from './OrderSteps.css'

const OrderSteps = props => {
  const children = React.Children.toArray(props.children)
  return (
    <div className={classnames(styles.content, props.className)}>
      {
        children.map((Child, index) => {
          return React.cloneElement(Child, {
            step: props.step,
            index: index + 1,
            length: children.length,
            className: classnames(Child.props.className, styles[props.type]),
            style: {
              width: 100 / children.length + '%'
            }
          })
        })
      }
    </div>
  )
}

OrderSteps.propTypes = {
  step: PropTypes.number,
  type: PropTypes.oneOf(['normal', 'center'])
}

OrderSteps.defaultProps = {
  step: 1,
  type: 'normal'
}

const StepsItem = props => {
  const {isTextUp, title, time, onClick} = props
  return (
    <div className={classnames(styles.step, props.className, {
      [styles.active]: props.step >= props.index, [styles.up]: !isTextUp
    })} style={props.style} onClick={onClick}>
      {!isTextUp ? <span className={classnames(styles.number, {[styles.curNum]: props.step === props.index})}></span> : null}
      {!isTextUp && props.step === props.index ? <span className={classnames(styles.cur, styles.bottomCur)}></span> : null}
      <p className={styles.text}>{title}</p>
      <p className={classnames(styles.text, styles.mtop)}>{time}</p>
      {props.length === props.index ? null : <span className={classnames(styles.line, {[styles.linePos]: !isTextUp, [styles.lineActive]: props.step > props.index})}></span>}
      {isTextUp ? <span className={classnames(styles.number, {[styles.curNum]: props.step === props.index})}></span> : null}
      {isTextUp && props.step === props.index ? <span className={styles.cur}></span> : null}
    </div>
  )
}

StepsItem.propTypes = {
  icon: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
}

OrderSteps.Item = StepsItem

export default OrderSteps
