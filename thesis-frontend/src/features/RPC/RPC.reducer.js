import i from 'icepick'

const initialState = {
  stores: [],
  subscribers: 0,
}

export default function rpc (state = initialState, action) {
  switch (action.type) {
    case 'RPC/GET_CHANNELS':
      return i.assoc(state, 'stores', action.payload.rows)
    case 'RPC/GET_SUBSCRIBERS':
      return i.assoc(state, 'subscribers', action.payload.rows.length)
    default:
      return state
  }
}