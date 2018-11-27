
export const getStartedNext = () => ({
  type: 'AUTH/GET_STARTED_NEXT',
})

export const getStartedBack = () => ({
  type: 'AUTH/GET_STARTED_PREV',
})

export const getStartedAt = index => ({
  type: 'AUTH/GET_STARTED_AT_INDEX',
  payload: index,
})

export const authCompleted = () => ({
  type: 'AUTH/GET_STARTED_COMPLETED',
})