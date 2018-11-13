
export const getStartedNext = () => dispatch => dispatch({
  type: 'GET_STARTED/NEXT',
})

export const getStartedBack = () => dispatch => dispatch({
  type: 'GET_STARTED/BACK',
})

export const getStartedAt = index => dispatch => dispatch({
  type: 'GET_STARTED/AT_INDEX',
  payload: index,
})