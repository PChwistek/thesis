import { endpoint, network } from '../../api/scatterConfig'
import { Api, JsonRpc } from 'eosjs'
import { transaction } from './Blockchain.utils'

export const sayHello = () => (dispatch, getState) => {
  const store = getState()
  const scatter = store.scatter.ref
  const account = store.scatter.account
  const rpc = new JsonRpc(endpoint)
  const api = scatter.eos(network, Api, { rpc })
  return transaction(api, 'hello', 'hi', account, { user: account.name} )
}

export const transferMoney = account => (dispatch, getState) => {
  /*
  const store = getState()
  const scatter = store.scatter.ref
  const scatterAccount = store.scatter.account
  const eosOptions = { expireInSeconds:300 }
  const eos = scatter.eos(network, Api, { JsonRpc })
  const transactionOptions = { authorization:[`${scatterAccount.name}@${scatterAccount.authority}`] }

  eos.transfer(scatterAccount.name, account.name, '1.0000 SYS', 'memo', transactionOptions).then(trx => {
    // That's it!
    console.log(`Transaction ID: ${trx.transaction_id}`)
    console.log(trx)
  }).catch(error => {
    console.error(error)
  })*/
}

export const payForSubscriptionCart = accounts => (dispatch, getStore) => true