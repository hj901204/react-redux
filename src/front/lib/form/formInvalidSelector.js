import invariant from 'invariant'

// redux-form formInvalidSelector
export default function formInvalidSelector(formName) {
  invariant(formName, 'formName value must be specified')

  return function(state, ...fieldNames) {
    invariant(state, 'state value must be specified')

    const form = state.form[formName] || {}
    const {fields = {}, syncErrors = {}, asyncErrors = {}, submitErrors = {}} = form
    if (fieldNames.length === 1) {
      return !!(syncErrors[fieldNames[0]] || asyncErrors[fieldNames[0]] || submitErrors[fieldNames[0]])
    }

    return fieldNames.reduce((invalid, key) => {
      let error = syncErrors[key] || asyncErrors[key] || submitErrors[key]
      invalid[key] = !!error
      return invalid
    }, {})
  }
}
