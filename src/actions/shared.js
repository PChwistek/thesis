import getWeb3 from '../utils/web3'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import TruffleContract from 'truffle-contract'
import SubscriptionFactoryJSON from '../build/contracts/SubscriptionFactory.json'


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

//only for dev!
export function createContracts () {
  return (dispatch) => {
    dispatch(showLoading())
    return getWeb3.then(({web3}) => {
      const SubscriptionFactory = TruffleContract(SubscriptionFactoryJSON)
      SubscriptionFactory.setProvider(web3.currentProvider)
      SubscriptionFactory.deployed().then((instance) => {
        return instance.createSubscription('test', {from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'}).then((result) => {
          console.log(result)
        })
      })
      dispatch(hideLoading())
    })
  }
}
