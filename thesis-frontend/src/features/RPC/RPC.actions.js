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

export function getProject (creator, projectTitle) {
  const rpc = new JsonRpc(endpoint)
  return rpc.get_table_rows({
    code: 'submerged',
    scope: creator,
    table: 'projects',
    json: true
  }).then(res => {
    const { rows } = res
    return rows.filter(row => row.project_name === projectTitle)[0]
  })
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
