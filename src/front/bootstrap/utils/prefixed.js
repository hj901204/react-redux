import canUseDOM from 'dom-helpers/util/inDOM'

const prefixes = 'Moz O ms Webkit'.toLowerCase().split(' ')

// 兼容css属性，添加浏览器厂商前缀
const prefixed = props => {
  if (!canUseDOM) {
    return props
  }

  const style = document.createElement('div').style
  return Object.keys(props).reduce((result, key) => {
    if (typeof style[key] !== 'undefined') {
      result[key] = props[key]
      return result
    }

    for (let i = 0, len = prefixes.length; i < len; i++) {
      const prefixedKey = prefixes[i] + key[0].toUpperCase() + key.substr(1)
      if (typeof style[prefixedKey] !== 'undefined') {
        result[prefixedKey] = props[key]
        return result
      }
    }

    return result
  }, {})
}

export default prefixed
