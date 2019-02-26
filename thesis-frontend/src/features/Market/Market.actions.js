import { JsonRpc } from 'eosjs'
import { endpoint } from '../../api/scatterConfig'

/* eslint-disable */


export const getStores = () => dispatch=> {
  const rpc = new JsonRpc(endpoint)
  rpc.get_table_rows({
    code: 'submerged',
    scope: 'submerged',
    table: 'channels',
    json: true
  }).then(res => dispatch({
    type: 'CHANNELS/GET_CHANNELS',
    payload: res,
  }))
}