import request from '../../lib/request'
const ORDERLIST = 'front/LargeScreen/LARGESCREEN'
const TOTALDATA = 'front/LargeScreen/TOTALDATA'
const initialState = {
  orderList: [],
  totalData: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDERLIST:
      return {...state, orderList: action.data}
    case TOTALDATA:
      return {...state, totalData: action.data}
    default:
      return state
  }
}
export const orderList = body => dispatch => {
  return request
    .post('/api/purchaser/cloudcut/platformOrderManage/selectPurchaseOrderList')
    .send(body)
    .then(data => dispatch({type: ORDERLIST, data}))
    .catch(error => {
      dispatch({type: ORDERLIST, error})
      throw error
    })
}
export const totalData = body => dispatch => {
  return request
    .post('/api/purchaser/cloudcut/platformOrderManage/selectCountInfo')
    .send(body)
    .then(data => dispatch({type: TOTALDATA, data}))
    .catch(error => {
      dispatch({type: TOTALDATA, error})
      throw error
    })
}
