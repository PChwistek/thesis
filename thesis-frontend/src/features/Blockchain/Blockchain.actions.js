import axios from 'axios'
import { Api, JsonRpc } from 'eosjs'
import { endpoint, network } from '../../api/scatterConfig'
import { transaction } from './Blockchain.utils'
import { logSubscribe } from '../Subscribe/Subscribe.actions'
import { post } from '../Social/Social.actions'
import { getProject } from '../RPC/RPC.actions'

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

export const openChannel = ({ price, desc, tags, name }) => (dispatch, getState) => {
  const store = getState()
  const scatter = store.scatter.ref
  const account = store.scatter.identity.accounts[0]
  const { username } = store.auth
  const rpc = new JsonRpc(endpoint)
  const api = scatter.eos(network, Api, { rpc })
  dispatch({ type: 'BLOCKCHAIN/OPEN_STORE_PENDING' })
  return transaction(api, 'submerged', 'open', account, { creator: account.name, num_projects: 10, minimum_price: `${price} SYS`})
    .then(
      response => { 
        dispatch({ type: 'BLOCKCHAIN/OPEN_STORE_FULFILLED', payload: response, })
        return dispatch({
          type: 'CHANNEL/LOG_CHANNEL',
          payload: axios({
            method: 'POST',
            url: 'http://localhost:3009/api/channel',
            data: {
              username,
              account: account.name,
              channelName: name,
              minimumPrice: `${price} SYS`,
              description: desc,
              tags,
            }
          }).then(res => dispatch({
            type: 'CHANNEL/LOG_CHANNEL_FULFILLED',
            payload: res.data,
          }))
        })
      },
      error => dispatch({ type: 'BLOCKCHAIN/OPEN_STORE_REJECTED', payload: error, }),
    )
}

export const subscribe = (contentCreator, amount) => (dispatch, getState) => {
  const store = getState()
  const scatter = store.scatter.ref
  const account = store.scatter.identity.accounts[0]
  const rpc = new JsonRpc(endpoint)
  const api = scatter.eos(network, Api, { rpc })
  dispatch({ type: 'BLOCKCHAIN/SUBSCRIBE_PENDING' })
  return transaction(api, 'eosio.token', 'transfer', account, { from: account.name, to: 'submerged', quantity: `${amount}`, memo: contentCreator})
    .then(
      response => {
        dispatch({ type: 'BLOCKCHAIN/SUBSCRIBE_FULFILLED', payload: response})
        return dispatch(logSubscribe(contentCreator, response))
      },
      error => dispatch({ type: 'BLOCKCHAIN/SUBSCRIBE_REJECTED', payload: error}),
    )
}

export const declareProject = (thePost) => (dispatch, getState) => {
  const store = getState()
  const scatter = store.scatter.ref
  const account = store.scatter.identity.accounts[0]
  const rpc = new JsonRpc(endpoint)
  const api = scatter.eos(network, Api, { rpc })
  const secondsToDeadline = 10000
  console.log('thePost', thePost)
  dispatch({ type: 'BLOCKCHAIN/DECLARE_PROJECT_PENDING' })
  return transaction(api, 'submerged', 'initproject', account, { 
    creator: account.name, 
    project_name: thePost.title, 
    content_type: thePost.contentType, 
    seconds_to_deadline: secondsToDeadline, 
    month: 0,
  } )
    .then(
      response => {
        dispatch({ type: 'BLOCKCHAIN/DECLARE_PROJECT_FULFILLED', payload: response, })
        return dispatch(post(thePost))
      },
      error => dispatch({ type: 'BLOCKCHAIN/DECLARE_PROJECT_REJECTED', payload: error, })
    )
}


export const deliverProject = (thePost) => async (dispatch, getState) => {
  const store = getState()
  const scatter = store.scatter.ref
  const account = store.scatter.identity.accounts[0]
  const rpc = new JsonRpc(endpoint)
  const api = scatter.eos(network, Api, { rpc })
  const project = await getProject(account.name, thePost.title)
  const { key } = project

  dispatch({ type: 'BLOCKCHAIN/FULFILL_PROJECT_PENDING' })
  return transaction(api, 'submerged', 'fulfill', account, { 
    creator: account.name, 
    project_key: key,
  } )
    .then(
      response => {
        dispatch({ type: 'BLOCKCHAIN/FULFILL_PROJECT_FULFILLED', payload: response, })
        return dispatch(post(thePost))
      },
      error => dispatch({ type: 'BLOCKCHAIN/FULFILL_PROJECT_REJECTED', payload: error, })
    ) 
}
