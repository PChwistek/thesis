import axios from 'axios'

export const logSubscribe = (creator, transactionId) => (dispatch, getState) => {
  const store = getState()
  const { auth:{ account } } = store
  console.log('transax', transactionId)
  return dispatch({
    type: 'SUBSCRIBE/NEW_SUBSCRIPTION',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:3009/api/user/subscribe',
      data: {
        subscriber: account,
        creator,
      }
    }).then(res => {
      return dispatch({
        type: 'SUBSCRIBE/NEW_SUBSCRIPTION_FULFILLED',
        payload: res.data,
      })
    })
  }) 
}