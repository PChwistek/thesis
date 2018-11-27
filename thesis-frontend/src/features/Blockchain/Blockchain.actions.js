import { network } from '../../api/scatterConfig'
import Eos from 'eosjs'

export const sayHello = () => (dispatch, getStore) => {
  const store = getStore()

  const scatter = store.scatter.ref
  const account = store.scatter.account
  const eosOptions = { expireInSeconds:60 }
  const eos = scatter.eos(network, Eos, eosOptions)
  const transactionOptions = { authorization:[`${account.name}@${account.authority}`] }

  eos.contract('hello').then(hello => hello.hi( {'user': 'alice' }, transactionOptions))
    .then(res => console.log(res))
  
}

export const transferMoney = account => (dispatch, getStore) => {

  const store = getStore()
  const scatter = store.scatter.ref
  const scatterAccount = store.scatter.account
  const eosOptions = { expireInSeconds:300 }
  const eos = scatter.eos(network, Eos, eosOptions)
  const transactionOptions = { authorization:[`${scatterAccount.name}@${scatterAccount.authority}`] }

  eos.transfer(scatterAccount.name, account.name, '1.0000 SYS', 'memo', transactionOptions).then(trx => {
    // That's it!
    console.log(`Transaction ID: ${trx.transaction_id}`)
    console.log(trx)
  }).catch(error => {
    console.error(error)
  })
}

export const payForSubscriptionCart = accounts => (dispatch, getStore) => true