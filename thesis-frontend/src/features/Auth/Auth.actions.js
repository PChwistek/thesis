import { signOutScatter } from '../Scatter/Scatter.actions'
import axios from 'axios'
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

export const signout = () => dispatch => {
  return dispatch({
    type: 'AUTH/SIGNOUT',
    payload: signOutScatter(),
  })
}

export const createScatterAssocAccount = () => (dispatch, getState) => {
  const scatter = getState().scatter
  const { identity: { publicKey, personal: { firstname, lastname, email } } } = scatter
  return dispatch({
    type: 'AUTH/CREATE_SCATTER_ASSOCIATED_ACCOUNT',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:3009/api/auth',
      data: {
        publicKey,
        first: firstname,
        last: lastname,
        email,
      }
    }),
  })
}

export const getScatterAssocAccount = () => (dispatch, getState) => {
  const scatter = getState().scatter
  const { identity: { publicKey } } = scatter
  return dispatch({
    type: 'AUTH/CREATE_SCATTER_ASSOCIATED_ACCOUNT',
    payload: axios({
      method: 'GET',
      url: 'http://localhost:3009/api/auth',
      data: {
        publicKey,
      },
    }),
  })
}
