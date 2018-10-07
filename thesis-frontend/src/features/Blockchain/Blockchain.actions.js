import { network } from '../../api/scatterConfig'
import Eos from 'eosjs'

export const sayHello = () => (dispatch, getStore) => {
  const store = getStore()

  const scatter = store.scatter.ref
  const account = store.scatter.account
  const eosOptions = { expireInSeconds:60 }
  console.log('here mofo')
  const eos = scatter.eos(network, Eos, eosOptions)
  const transactionOptions = { authorization:[`${account.name}@${account.authority}`] }

  eos.contract('hello').then(hello => hello.hi( {'user': 'alice' }, transactionOptions))
    .then(res => console.log(res))

  /*

  
  eos.transfer(account.name, 'hi', 'alice', '0.0000 EOS', transactionOptions).then(trx => {
    // That's it!
    console.log(`Transaction ID: ${trx.transaction_id}`)
  }).catch(error => {
    console.error(error)
  })

  */
  
}