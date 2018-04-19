import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'

import user from './modules/user'
import card from './modules/card'
import largeScreen from './modules/largeScreen'
const rootReducer = combineReducers({
  router,
  form,
  user,
  card,
  largeScreen
})

export default rootReducer
