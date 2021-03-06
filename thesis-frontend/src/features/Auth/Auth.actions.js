import axios from 'axios'
import { get } from 'lodash'
import { signOutScatter } from '../Scatter/Scatter.actions'
import { clearSocial } from '../Social/Social.actions'
import { clearChannels } from '../Channels/Channel.actions'
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
  const store = getState()  
  const scatter = store.scatter
  const { identity: { publicKey, hash, name, accounts } } = scatter
  const { firstname, lastname, email } = store.form.account.values
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
      return dispatch({
        type: 'AUTH/CREATE_SCATTER_ASSOCIATED_ACCOUNT_FULFILLED',
        payload: response.data,
      })
    }).catch(() => dispatch({ type: 'AUTH/CREATE_SCATTER_ASSOCIATED_ACCOUNT_REJECTED' })),
  })
}

export const verifyAccountByToken = () => (dispatch, getState) => {
  const token = get(getState(), 'auth.token', false)
  if(token) return false
}

export const loginScatter = () => (dispatch, getState) => {
  const scatter = getState().scatter
  const { identity: { accounts } } = scatter
  console.log(get(accounts[0], 'name'))
  return dispatch({
    type: 'AUTH/LOGIN_WITH_SCATTER',
    payload: axios({
      method: 'POST',
      url: 'http://localhost:3009/api/auth/sign-in-scatter',
      data: {
        account: get(accounts[0], 'name'),
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
  const store = getState()
  const token = store.auth.token
  const { scatter: { identity: { accounts } } } = store
  const logout = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:3009/api/auth/logout',
      data: {
        account: get(accounts[0], 'name'),
      },
      headers: { 'Authorization' : `Bearer ${token}`},
    })
  }
  dispatch([signOutScatter(), logout(), clearChannels(), clearSocial()])
  return dispatch({
    type: 'AUTH/LOGOUT',
  })
}