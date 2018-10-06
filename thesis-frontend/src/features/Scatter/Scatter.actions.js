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

export const setScatterPending = () => ({
  type: 'SCATTER/SET_SCATTER_PENDING',
})

export const setScatterRejected = () => ({
  type: 'SCATTER/SET_SCATTER_REJECTED'
})
