import {combineReducers} from 'redux'

import user from './models/user'
import menus from './models/menus'
import buyerPendingOrder from './models/buyerPendingOrders'

const rootReducer = combineReducers({
  user,
  menus,
  buyerPendingOrder
})

export default rootReducer
