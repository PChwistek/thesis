import { network } from '../../api/scatterConfig'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs2'

ScatterJS.plugins( new ScatterEOS() )

export const setScatter = () => (dispatch) => {
  dispatch({type: 'SCATTER/SET_SCATTER_PENDING'})
  ScatterJS.scatter.connect('thesis').then(connected => {
    if(!connected) return dispatch(setScatterRejected())
    dispatch({
      type: 'SCATTER/SET_SCATTER_SUCCEEDED',
      payload: ScatterJS.scatter,
    })
    window.scatter = null
  }).catch(err => console.log('error', err))
  
}

export const setScatterAccount = () => (dispatch, getState) => {
  const scatter = getState().scatter.ref
  if(!scatter) return dispatch(setScatterRejected())
  const requiredFields = { 
    accounts:[network], 
    personal:['firstname', 'lastname', 'email'], 
  }

  scatter.getIdentity(requiredFields).then(() => {
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos')
    dispatch({
      type: 'SCATTER/SET_SCATTER_ACCOUNT_SUCCEEDED',
      payload: {
        account,
      }
    })
  }).catch((error) => {
    console.log(error)
    dispatch({ type: 'SCATTER/SET_SCATTER_ACCOUNT_FAILED'})
  })
}


export const setScatterRejected = () => ({
  type: 'SCATTER/SET_SCATTER_REJECTED',
})
