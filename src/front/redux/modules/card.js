import request from '../../lib/request'
const CARD = 'front/Card/CARD'
const BACKORDER = 'front/Card/BACKORDER'
const SUBMITDATA = 'front/Card/SUBMITDATA'
const initialState = {
  nextStep: false,
  cardData: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CARD:
      return {...state, nextStep: true, cardData: action.body}
    case BACKORDER:
      return {...state, nextStep: false}
    case SUBMITDATA:
      return {...state}
    default:
      return state
  }
}
export const orderClick = body => dispatch => {
  return dispatch({type: CARD, body})
}
export const backOrder = body => dispatch => {
  return dispatch({type: BACKORDER, body})
}

export const handleSubmit = body => dispatch => {
  return request
    .post('/api/purchaser/cloudcut/platformOrderManage/addOrder')
    .send(body)
    .then(data => dispatch({type: SUBMITDATA, data}))
    .catch(error => {
      dispatch({type: SUBMITDATA, error})
      throw error
    })
}
