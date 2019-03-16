import { push } from 'connected-react-router'
import axios from 'axios'

export const goToChannel = key  => (dispatch) => {
  return dispatch(
    push({
      pathname: '/channel',
      state: { key }
    })
  )
}

export const getUserChannel = account => dispatch => {
  return dispatch({
    type: 'CHANNEL/GET_USER_CHANNEL',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:3009/api/channel/user',
      data: {
        account,
      }
    }).then(res => dispatch({
      type: 'CHANNEL/GET_USER_CHANNEL_FULFILLED',
      payload: res.data
    }))
  })
}

export const getChannel = account => dispatch => {
  return dispatch({
    type: 'CHANNEL/GET_CHANNEL_DETAILS',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:3009/api/channel/user',
      data: {
        account,
      }
    }).then(res => dispatch({
      type: 'CHANNEL/GET_CHANNEL_DETAILS_FULFILLED',
      payload: res.data
    }))
  })
}