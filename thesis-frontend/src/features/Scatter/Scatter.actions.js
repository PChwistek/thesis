import { network } from '../../api/scatterConfig'
import ScatterJS from 'scatter-js/dist/scatter.esm'

export const setScatter = () => (dispatch) => {
  dispatch(setScatterPending())
  ScatterJS.scatter.connect('thesis').then(connected => {
    
    if(!connected) return dispatch(setScatterRejected())
    dispatch({
      type: 'SCATTER/SET_SCATTER_SUCCEEDED',
      payload: ScatterJS.scatter,
    })

    window.scatter = null
  })
  
}

export const setScatterAccount = () => (dispatch, getState) => {
  const scatter = getState().scatter.ref
  if(!scatter) return dispatch(setScatterRejected)
  const requiredFields = { accounts:[network] }
  dispatch({
    type: 'SCATTER/SET_SCATTER_ACCOUNT_PENDING',
  })

  scatter.getIdentity(requiredFields).then(() => {
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos')
    return dispatch({
      type: 'SCATTER/SET_SCATTER_ACCOUNT_SUCCEEDED',
      payload: account,
    })
  }).catch((error) => {
    console.log(error)
    return dispatch({ type: 'SCATTER/SET_SCATTER_ACCOUNT_FAILED'})
  })

}

export const setScatterPending = () => ({
  type: 'SCATTER/SET_SCATTER_PENDING',
})

export const setScatterRejected = () => ({
  type: 'SCATTER/SET_SCATTER_REJECTED',
})
