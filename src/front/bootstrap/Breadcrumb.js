import React from 'react'
import {Link} from 'react-router-dom'
import classnames from 'classnames'

const Breadcrumb = props => {
  const items = React.Children.toArray(props.children)
  return (
    <ol className={classnames('breadcrumb', props.className)}>
      {
        items.map((item, index) => {
          const {target, replace, to, children, className, ...props} = item.props
          const newChildren = to ? <Link to={to} target={target} replace={replace}>{children}</Link> : children
          const newClassName = classnames(className, {active: index === (items.length - 1)})
          const newProps = {...props, key: index, className: newClassName}

          return React.createElement('li', newProps, newChildren)
        })
      }
    </ol>
  )
}

Breadcrumb.Item = props => {
  return null
}

export default Breadcrumb
