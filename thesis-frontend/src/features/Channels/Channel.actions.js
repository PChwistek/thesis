import { push } from 'connected-react-router'

export const goToChannel = key  => (dispatch) => {
  return dispatch(
    push({
      pathname: '/channel',
      state: { key }
    })
  )
}

export const channelDetails = () => dispatch => {
  return dispatch({
    type: 'CHANNEL/POST_EXTRA_DETAILS',
    payload: {

    }
  })
}