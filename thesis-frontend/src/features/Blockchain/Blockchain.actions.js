import axios from 'axios'
import { Api, JsonRpc } from 'eosjs'
import { endpoint, network } from '../../api/scatterConfig'
import { transaction } from './Blockchain.utils'

export const sayHello = () => (dispatch, getState) => {
  const store = getState()
  const scatter = store.scatter.ref
  const account = store.scatter.identity.accounts[0]
  const rpc = new JsonRpc(endpoint)
  const api = scatter.eos(network, Api, { rpc })
  dispatch({ type: 'BLOCKCHAIN/SAY_HELLO_PENDING' })
  return transaction(api, 'hello', 'hi', account, { user: account.name} )
    .then(
      response => dispatch({ type: 'BLOCKCHAIN/SAY_HELLO_FULFILLED', payload: response, }),
      error => dispatch({ type: 'BLOCKCHAIN/SAY_HELLO_REJECTED', payload: error, })
    )

}

export const openChannel = (limit, minimumPrice) => (dispatch, getState) => {
  const store = getState()
  const scatter = store.scatter.ref
  const account = store.scatter.identity.accounts[0]
  const rpc = new JsonRpc(endpoint)
  const api = scatter.eos(network, Api, { rpc })
  console.log('ACCOUNT', account)
  dispatch({ type: 'BLOCKCHAIN/OPEN_STORE_PENDING' })
  return transaction(api, 'submerged', 'open', account, { creator: account.name, num_projects: 2, minimum_price: `${minimumPrice} SYS`})
    .then(
      response => dispatch({ type: 'BLOCKCHAIN/OPEN_STORE_FULFILLED', payload: response, }),
      error => dispatch({ type: 'BLOCKCHAIN/OPEN_STORE_REJECTED', payload: error, }),
    )
    .then(() => dispatch({
      type: 'BLOCKCHAIN/LOG_CHANNEL',
      payload: axios({
        method: 'POST',
        url: 'http://localhost:3009/api/channel',
        data: {
          username: account.name,
          minimumPrice: `${minimumPrice} SYS`,
        }
      })
    }))
}

export const subscribe = (contentCreator, amount) => (dispatch, getState) => {
  const store = getState()
  const scatter = store.scatter.ref
  const account = store.scatter.identity.accounts[0]
  const rpc = new JsonRpc(endpoint)
  const api = scatter.eos(network, Api, { rpc })
  dispatch({ type: 'BLOCKCHAIN/SUBSCRIBE_PENDING' })
  return transaction(api, 'eosio.token', 'transfer', account, { from: account.name, to: 'submanager', quantity: `${amount}`, memo: contentCreator})
    .then(
      response => dispatch({ type: 'BLOCKCHAIN/SUBSCRIBE_FULFILLED', payload: response}),
      error => dispatch({ type: 'BLOCKCHAIN/SUBSCRIBE_REJECTED', payload: error}),
    )
}
