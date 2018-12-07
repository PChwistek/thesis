import { network } from '../../api/scatterConfig'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs2'

ScatterJS.plugins( new ScatterEOS() )

export const setScatter = () => (dispatch) => {
  dispatch({type: 'SCATTER/CONNECT_SCATTER_PENDING'})
  ScatterJS.scatter.connect('thesis').then(connected => {
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
  dispatch({type: 'SCATTER/SET_ACCOUNT_PENDING'})
  if(!scatter) return dispatch({ type: 'SCATTER/SET_ACCOUNT_REJECTED'})
  const requiredFields = { 
    accounts:[network], 
    personal:['firstname', 'lastname', 'email'], 
  }
  scatter.getIdentity(requiredFields).then(() => {
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos')
    return dispatch({
      type: 'SCATTER/SET_ACCOUNT_SUCCEEDED',
      payload: {
        account,
      }
    })
  }).catch((error) => {
    console.log(error)
    dispatch({ type: 'SCATTER/SET_ACCOUNT_REJECTED'})
  })
}

