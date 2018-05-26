import getWeb3 from '../utils/web3'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export function fetchWeb3Data () {
  return (dispatch) => {
    dispatch(showLoading())
    return getWeb3.then(({web3}) => {
      web3.eth.getAccounts((error, accounts) => {
        const theAccount = accounts[0]
        typeof theAccount !== 'undefined'
          ? dispatch(setAuthedUser(theAccount))
          : dispatch(setAuthedUser(null))
      })
      dispatch(hideLoading())
    })
  }
}