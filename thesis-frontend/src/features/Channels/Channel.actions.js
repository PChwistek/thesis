import { push } from 'connected-react-router'

export const goToChannel = (key) => (dispatch) => {
  console.log(key)
  return dispatch(
    push({
      pathname: '/channel',
      state: { key, }
    })
  )
}
