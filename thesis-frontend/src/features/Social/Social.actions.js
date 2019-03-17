import axios from 'axios'
import { destroy } from 'redux-form'

export const getFeed = () => (dispatch, getState) => {
  const store = getState()
  const { auth: { account } } = store  
  return dispatch({
    type: 'SOCIAL/GET_FEED',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:3009/api/social/feed',
      data: {
        username: account,
      }
    }).then(res => {
      dispatch({
        type: 'SOCIAL/GET_FEED_FULFILLED',
        payload: res.data,
      })
    }).catch(() => dispatch({
      type: 'SOCIAL/GET_FEED_REJECTED',
    }))
  }) 
}

export const getChannelFeed = key => dispatch => {
  return dispatch({
    type: 'SOCIAL/GET_CHANNEL_FEED',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:3009/api/social/channelfeed',
      data: {
        username: key,
      }
    }).then(res => {
      dispatch({
        type: 'SOCIAL/GET_CHANNEL_FEED_FULFILLED',
        payload: res.data,
      })
    }).catch(() => dispatch({
      type: 'SOCIAL/GET_CHANNEL_FEED_REJECTED',
    }))
  })
}

export const post = thePost => (dispatch, getState) => {
  const store = getState()
  const { auth: { account, username } } = store
  thePost.time = new Date(Date.now())
  thePost.user = username
  dispatch({
    type: 'SOCIAL/NEW_POST',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:3009/api/social',
      data: {
        account,
        newPost: thePost,
      }
    })
  }) 
  return dispatch(destroy('post'))
}
