import request from '../../lib/request'

const LOGOUT = 'front/user/LOGOUT'
const LOGOUT_SUCCESS = 'front/user/LOGOUT_SUCCESS'
const LOGOUT_FAILURE = 'front/user/LOGOUT_FAILURE'
const LOGIN = 'front/user/LOGIN'

const initialState = {
  isFetching: false,
  data: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {...state, isFetching: true, error: null}

    case LOGOUT_FAILURE:
      return {...state, isFetching: false, error: action.error}

    case LOGOUT_SUCCESS:
      return {...state, isFetching: false, data: null}

    default:
      return state
  }
}

// 退出
export const logout = body => dispatch => {
  dispatch({type: LOGOUT})
  return request
    .get('/logout')
    .then(data => dispatch({type: LOGOUT_SUCCESS}))
    .catch(error => {
      dispatch({type: LOGOUT_FAILURE, error})
      throw error
    })
}
