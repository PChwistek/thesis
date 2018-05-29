import getWeb3 from '../utils/web3'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import TruffleContract from 'truffle-contract'
import NaiveSubscriptionFactory from '../build/contracts/NaiveSubscriptionFactory.json'
import SubscriptionFactory from '../build/contracts/SubscriptionFactory.json'
import Subscription from '../build/contracts/Subscription.json'


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
      const NaiveSubscriptionFactoryContract = TruffleContract(NaiveSubscriptionFactory)
      NaiveSubscriptionFactoryContract.setProvider(web3.currentProvider)
      NaiveSubscriptionFactoryContract.deployed()
        .then((instance) => {
          return instance.newSubscription({from: '0xd707343B9290caddC9014474079427590231e5ae'})
        })
        .then((result) => {
          // we want to use normal JavaScript b/c of the break
          for (let i = 0; i < result.logs.length; i++) {
            var log = result.logs[i]
            if (log.event === 'DeployedSubscription') {
              break
            }
          }
          return 
        })
        .catch(function(err) {
          console.log('error', err)
        })
      dispatch(hideLoading())
    })
  }
}

export function createSubscriptionFromFactory () {
  return (dispatch) => {
    dispatch(showLoading())
    return getWeb3.then(({web3}) => {
      const SubscriptionFactoryContract = TruffleContract(SubscriptionFactory)
      SubscriptionFactoryContract.setProvider(web3.currentProvider)
      SubscriptionFactoryContract.deployed()
        .then((instance) => {
          return instance.createThing('test', 0, {from: '0xd707343B9290caddC9014474079427590231e5ae'})
        })
        .then((result) => {
          // we want to use normal JavaScript b/c of the break
          let newAddress = ''
          for (let i = 0; i < result.logs.length; i++) {
            var log = result.logs[i]
            if (log.event === 'SubscriptionCreated') {
              newAddress = log.args.newSubAddress
              console.log(newAddress)
              break
            }
          }
          const NewContract = TruffleContract(Subscription)
          NewContract.setProvider(web3.currentProvider)
          return NewContract.at(newAddress)
            .then((instance) => {
              return instance.doit({from: '0xd707343B9290caddC9014474079427590231e5ae'})
            })
            .then((result) => {
              console.log(result)
            })
        })
        .catch(function(err) {
          console.log('error', err)
        })
      dispatch(hideLoading())
    })
  }
}

