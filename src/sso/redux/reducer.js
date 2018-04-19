import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import {routerReducer as router} from 'react-router-redux'

import user from '../../front/redux/modules/user'
import sso from '../../front/redux/modules/sso'

const rootReducer = combineReducers({
  form,
  router,
  user,
  sso
})

export default rootReducer
