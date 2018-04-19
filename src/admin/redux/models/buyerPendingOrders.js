import request from '../../lib/request'
import {mapData} from '../../lib/helpers'

const ADD = 'admin/buyerPenddingOrders/ADD'
const ADD_SUCCESS = 'admin/buyerPenddingOrders/ADD_SUCCESS'
const ADD_FAILURE = 'admin/buyerPenddingOrders/ADD_FAILURE'

const LOAD = 'admin/buyerPenddingOrders/LOAD'
const LOAD_SUCCESS = 'admin/buyerPenddingOrders/LOAD_SUCCESS'
const LOAD_FAILURE = 'admin/buyerPenddingOrders/LOAD_FAILURE'

const LOAD_ONE = 'admin/buyerPenddingOrders/LOAD_ONE'
const LOAD_ONE_SUCCESS = 'admin/buyerPenddingOrders/LOAD_ONE_SUCCESS'
const LOAD_ONE_FAILURE = 'admin/buyerPenddingOrders/LOAD_ONE_FAILURE'

const OPERATE = 'admin/buyerPenddingOrders/OPERATE'
const OPERATE_SUCCESS = 'admin/buyerPenddingOrders/OPERATE_SUCCESS'
const OPERATE_FAILURE = 'admin/buyerPenddingOrders/OPERATE_FAILURE'

const initialState = {
  isFetching: false,
  allIds: [],
  byId: {},
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {...state, isFetching: true, error: null, allIds: []}

    case LOAD_ONE:
    case ADD:
    case OPERATE:
      return {...state, isFetching: true, error: null}

    case LOAD_FAILURE:
    case LOAD_ONE_FAILURE:
    case OPERATE_FAILURE:
    case ADD_FAILURE:
      return {...state, isFetching: false, error: action.error}

    case LOAD_SUCCESS:
      return {...state, isFetching: false, ...mapData(action.data.root ? action.data : {root: []}, 'orderCode')}

    case LOAD_ONE_SUCCESS:
      const byId = {}
      byId[action.param.orderCode] = action.data.root
      return {...state, isFetching: false, byId: {...state.byId, ...byId}}

    case OPERATE_SUCCESS:
    case ADD_SUCCESS:
      return {...state, isFetching: false}

    default:
      return state
  }
}

export const addPeddingOrder = body => dispatch => {
  dispatch({type: ADD})
  return request
    .post('/api/purchaser/cloudcut/platformOrderManage/addOrder')
    .send(body)
    .then(data => dispatch({type: ADD_SUCCESS, data}))
    .catch(error => {
      dispatch({type: ADD_FAILURE, error})
      throw error
    })
}

export const peddingOrderList = body => dispatch => {
  dispatch({type: LOAD})
  return request
    .post('/api/purchaser/cloudcut/platformOrderManage/selectPurchaseOrderList')
    .send(body)
    .then(data => dispatch({type: LOAD_SUCCESS, data}))
    .catch(error => {
      dispatch({type: LOAD_FAILURE, error})
      throw error
    })
}

export const peddingOrderOne = param => dispatch => {
  dispatch({type: LOAD_ONE})
  return request
    .post('/api/purchaser/cloudcut/platformOrderManage/selectPurchaseOrderDetail')
    .send(param)
    .then(data => dispatch({type: LOAD_ONE_SUCCESS, data, param}))
    .catch(error => {
      dispatch({type: LOAD_ONE_FAILURE, error})
      throw error
    })
}

export const peddingOrderOPerate = body => dispatch => {
  dispatch({type: OPERATE})
  return request
    .post('/api/purchaser/cloudcut/platformOrderManage/operPurchaseOrder')
    .send(body)
    .then(data => dispatch({type: OPERATE_SUCCESS, data}))
    .catch(error => {
      dispatch({type: OPERATE_FAILURE, error})
      throw error
    })
}
