import { network } from '../../api/scatterConfig'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs2'

ScatterJS.plugins( new ScatterEOS() )

export const setScatter = () => (dispatch) => {
  dispatch({type: 'SCATTER/CONNECT_SCATTER_PENDING'})
  ScatterJS.scatter.connect('Submerged').then(connected => {
    if(!connected) return dispatch({ type: 'SCATTER/CONNECT_SCATTER_REJECTED' })
    return dispatch({
      type: 'SCATTER/CONNECT_SCATTER_SUCCEEDED',
      payload: ScatterJS.scatter,
    })
  }).catch(err => console.log('error', err))
  window.scatter = null

}

export const setScatterAccount = () => (dispatch, getState) => {
  const scatter = getState().scatter.ref
  dispatch({type: 'SCATTER/SET_IDENTITY_PENDING'})
  if(!scatter) return dispatch({ type: 'SCATTER/SET_IDENTITY_REJECTED'})
  const requiredFields = { 
    accounts:[network], 
    personal:['firstname', 'lastname', 'email'], 
  }

  scatter.getIdentity(requiredFields).then(identity => {
    scatter.authenticate('123456789101').then(() => {
      return dispatch({
        type: 'SCATTER/SET_IDENTITY_SUCCEEDED',
        payload: {
          identity,
        }
      })
    }).catch(failedAuthentication => {
      dispatch({ type: 'SCATTER/SET_IDENTITY_REJECTED'})
      throw new Error('An Imposter!', failedAuthentication)
    })
  }).catch((error) => {
    console.log(error)
    dispatch({ type: 'SCATTER/SET_IDENTITY_REJECTED'})
  })
}

export const signOutScatter = () => (dispatch, getState) => {
  const scatter = getState().scatter.ref
  return dispatch({
    type: 'SCATTER/FORGET_IDENTITY',
    payload: scatter.forgetIdentity(),
  })
}
