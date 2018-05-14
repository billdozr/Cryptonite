import axios from 'axios'
import {
  coinMarketcapApiBaseURL,
  cryptopanicApiBaseURL
} from '../Utils/Constants'
import {
  FETCH_COIN_DATA,
  FETCH_COIN_DATA_SUCCESS,
  FETCH_COIN_DATA_FAIL
} from '../Utils/ActionTypes'

export default function FetchCoinData() {
  return dispatch => {
    dispatch({type: FETCH_COIN_DATA})
    return axios.get(`${coinMarketcapApiBaseURL}/v2/ticker/?limit=10`)
      .then(res => {
        const symbols = Object.keys(res.data.data).map((key) => res.data.data[key].symbol).join(',')
        axios.get(`${cryptopanicApiBaseURL}/posts/?auth_token=6225b85be3b432230592a83bd317e4aa46ff4bc7&public=true&currencies=${symbols}`)
          .then(res2 => {
            if (res2.data.next) {
              axios.get(res2.data.next)
                .then(res3 => {
                  res.data['news'] = res2.data.results.concat(res3.data.results)
                  dispatch({type: FETCH_COIN_DATA_SUCCESS, payload: res.data})
                })
                .catch(err => {
                  dispatch({type: FETCH_COIN_DATA_FAIL, payload: err.data})
                })
            } else {
              res.data['news'] = res2.data.results
              dispatch({type: FETCH_COIN_DATA_SUCCESS, payload: res.data})
            }
          })
          .catch(err => {
            dispatch({type: FETCH_COIN_DATA_FAIL, payload: err.data})
          })
      })
      .catch(err => {
        dispatch({type: FETCH_COIN_DATA_FAIL, payload: err.data})
      })
  }
}
