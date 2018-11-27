import Eos from 'eosjs'

/* eslint-disable */

const config = {
  httpEndpoint: 'http://127.0.0.1:7777',
}


export const getStores = () => dispatch=> {
  const eos = Eos(config)
  eos.getTableRows({
    code: 'submanager',
    scope: 'submanager',
    table: 'stores',
    json: true
  }).then(res => dispatch({
    type: 'MARKET/GET_STORES',
    payload: res,
  }))
}