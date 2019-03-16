import axios from 'axios'
import { get } from 'lodash'
import { signOutScatter } from '../Scatter/Scatter.actions'
import { push } from 'connected-react-router'

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

export const createScatterAssocAccount = () => (dispatch, getState) => {
  const scatter = getState().scatter
  const { identity: { publicKey, hash, name, personal: { firstname, lastname, email }, accounts } } = scatter
  return dispatch({
    type: 'AUTH/CREATE_SCATTER_ASSOCIATED_ACCOUNT',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:3009/api/auth',
      data: {
        publicKey,
        hash,
        username: name,
        first: firstname,
        last: lastname,
        account: get(accounts[0], 'name'),
        email,
      }
    }).then(response => {
      dispatch({
        type: 'AUTH/CREATE_SCATTER_ASSOCIATED_ACCOUNT_FULFILLED',
        payload: response.data,
      })
      return dispatch(loginScatter())
    }).catch(() => dispatch({ type: 'AUTH/CREATE_SCATTER_ASSOCIATED_ACCOUNT_REJECTED' })),
  })
}

export const verifyAccountByToken = () => (dispatch, getState) => {
  const token = get(getState(), 'auth.token', false)
  if(token) return false
}

export const loginScatter = () => (dispatch, getState) => {
  const scatter = getState().scatter
  const { identity: { publicKey, hash } } = scatter
  return dispatch({
    type: 'AUTH/LOGIN_WITH_SCATTER',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:3009/api/auth/sign-in-scatter',
      data: {
        publicKey,
        hash,
      },
    }).then(res => {
      dispatch({
        type: 'AUTH/LOGIN_WITH_SCATTER_FULFILLED',
        payload: res.data,
      })
      dispatch(push('/dashboard'))
    }).catch(() => dispatch({
      type: 'AUTH/LOGIN_WITH_SCATTER_REJECTED',
    }))
  })
}

export const logout = () => (dispatch, getState) => {
  const token = getState().auth.token
  const publicKey = getState().scatter.identity.publicKey
  const logout = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:3009/api/auth/logout',
      data: {
        publicKey,
      },
      headers: { 'Authorization' : `Bearer ${token}`},
    })
  }
  return dispatch({
    type: 'AUTH/LOGOUT',
    payload: [signOutScatter(), logout()],
  })
}

/*
export const updateUser = () => (dispatch, getState) => {
  
} */