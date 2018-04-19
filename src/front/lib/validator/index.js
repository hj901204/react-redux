import validator from 'validator'

window.validator = validator
// 自定义较验
const constValidator = {
  isRequired: str => !validator.isEmpty(str),
  isPhoneReg: str => {
    return validator.matches(str, /^0\d{2,3}$/)
  },
  isPhone: str => {
    return validator.matches(str, /^\d{7,8}$/)
  },
  isPhoneEx: str => {
    return validator.matches(str, /^(\d{1,6})?$/)
  }
}

function checkValue(rule, value) {
  for (let key in rule) {
    let fn = constValidator[key] || validator[key]
    let [message, ...options] = Array.isArray(rule[key]) ? rule[key] : [rule[key]]

    if (message && fn && !fn(value, ...options)) {
      return message
    }
  }
}

// 字段较验规则
// 1、字段如果有 isRequired 规则，则先较验 isRequired, 再较验其他规则
// 2、字段如果没有 isRequired 规则，则判断字段有没有值，如果有值则进行下面的较验

export default function validate(rules, values) {
  return Object.keys(rules).reduce((error, field) => {
    let rule = rules[field]
    let value = validator.toString(values[field])
    if (rule.isRequired ||
      (!rule.isRequired && !validator.isEmpty(value))) {
      let message = checkValue(rule, value)
      if (message) {
        error[field] = message
      }
    }
    return error
  }, {})
}
