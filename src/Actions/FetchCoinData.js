import axios from 'axios'
import { apiBaseURL } from '../Utils/Constants'
import {
  FETCH_COIN_DATA,
  FETCH_COIN_DATA_SUCCESS,
  FETCH_COIN_DATA_FAIL
} from '../Utils/ActionTypes'

export default function FetchCoinData() {
  return dispatch => {
    dispatch({type: FETCH_COIN_DATA})
    return axios.get(`${apiBaseURL}/v2/ticker/?limit=10`)
      .then(res => {
        dispatch({type: FETCH_COIN_DATA_SUCCESS, payload: res.data})
      })
      .catch(err => {
        dispatch({type: FETCH_COIN_DATA_FAIL, payload: err.data})
      })
  }
}
