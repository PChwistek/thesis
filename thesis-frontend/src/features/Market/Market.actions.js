import { JsonRpc } from 'eosjs'
import { endpoint } from '../../api/scatterConfig'

/* eslint-disable */


export const getStores = () => dispatch=> {
  const rpc = new JsonRpc(endpoint)
  rpc.get_table_rows({
    code: 'submanager',
    scope: 'submanager',
    table: 'stores',
    json: true
  }).then(res => dispatch({
    type: 'MARKET/GET_STORES',
    payload: res,
  }))
}