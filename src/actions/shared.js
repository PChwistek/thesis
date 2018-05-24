import getWeb3 from '../utils/web3'
import { initializeWeb3 } from './web3-redux'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {
  return (dispatch) => {
    return getWeb3.then(({web3}) => {
      dispatch(initializeWeb3(web3))
    })
  }
}