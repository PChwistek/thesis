import axios from 'axios'

export const getFeed = () => (dispatch, getState) => {
  const store = getState()
  const { auth: { username } } = store  
  return dispatch({
    type: 'SOCIAL/GET_FEED',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:3009/api/social/feed',
      data: {
        username,
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

export const post = thePost => (dispatch, getState) => {
  const store = getState()
  const { auth: { username } } = store
  thePost.time = new Date(Date.now())
  thePost.user = username
  return dispatch({
    type: 'SOCIAL/NEW_POST',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:3009/api/social',
      data: {
        username,
        newPost: thePost,
      }
    })
  }) 
}
