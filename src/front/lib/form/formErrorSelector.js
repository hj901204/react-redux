import invariant from 'invariant'

// redux-form formErrorSelector
export default function formErrorSelector(formName) {
  invariant(formName, 'formName value must be specified')

  return function(state, ...fieldNames) {
    invariant(state, 'state value must be specified')

    const form = state.form[formName] || {}
    const {fields = {}, syncErrors = {}, asyncErrors = {}, submitErrors = {}} = form

    return fieldNames.reduce((errors, key) => {
      if (fields[key] && fields[key].touched) {
        let error = syncErrors[key] || asyncErrors[key] || submitErrors[key]
        if (error) {
          errors[key] = error
        }
      }
      return errors
    }, {})
  }
}
