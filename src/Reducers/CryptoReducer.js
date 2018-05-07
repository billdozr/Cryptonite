import {
  FETCH_COIN_DATA,
  FETCH_COIN_DATA_SUCCESS,
  FETCH_COIN_DATA_FAIL
} from '../Utils/ActionTypes'

const initialState = {
  isFetching: false,
  data: {},
  hasError: false,
  errorMessage: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_COIN_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        data: null,
        hasError: false,
        errorMessage: null
      })
    case FETCH_COIN_DATA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload.data,
        hasError: false,
        errorMessage: null
      })
    case FETCH_COIN_DATA_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
        hasError: true,
        errorMessage: action.err
      })
    default:
      return state
  }
}
