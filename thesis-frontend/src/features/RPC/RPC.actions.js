import { JsonRpc } from 'eosjs'
import { endpoint } from '../../api/scatterConfig'

/* eslint-disable */


export const getChannels = () => dispatch => {
  const rpc = new JsonRpc(endpoint)
  rpc.get_table_rows({
    code: 'submerged',
    scope: 'submerged',
    table: 'channels',
    json: true
  }).then(res => dispatch({
    type: 'RPC/GET_CHANNELS',
    payload: res,
  }))
}

export const getSubscribers = (user) => dispatch => {
  const rpc = new JsonRpc(endpoint)
  console.log(user)
  rpc.get_table_rows({
    code: 'submerged',
    scope: user,
    table: 'csubs',
    json: true
  }).then(res => dispatch({
    type: 'RPC/GET_SUBSCRIBERS',
    payload: res,
  }))
}
