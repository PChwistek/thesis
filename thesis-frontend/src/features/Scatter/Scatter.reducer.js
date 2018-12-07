import i from 'icepick'

const initialState = {
  available: false,
  unlocked: false,
  isFetching: false,
  isFetchingAccount: false,
  ref: null,
  identity: null,
  publicKey: null,
  eos: null,
}

export default function scatter (state = initialState, action) {
  switch (action.type) {
    case 'SCATTER/CONNECT_SCATTER_PENDING':
      return i.assoc(state, 'isFetching', true)
    case 'SCATTER/CONNECT_SCATTER_REJECTED':
      return i.chain(state)
        .assoc('isFetching', false)
        .value()
    case 'SCATTER/CONNECT_SCATTER_SUCCEEDED':
      return i.chain(state)
        .assoc('available', true)
        .assoc('isFetching', false)
        .assoc('ref', action.payload)
        .value()
    case 'SCATTER/SET_IDENTITY_SUCCEEDED':
      return i.chain(state)
        .assoc('identity', action.payload.identity)
        .assoc('isFetchingAccount', false)
        .value()
    case 'SCATTER/SET_IDENTITY_PENDING':
      return i.assoc(state, 'isFetchingAccount', true)
    case 'SCATTER/SET_IDENTITY_REJECTED':
      return i.assoc(state, 'isFetchingAccount', false)
    case 'SCATTER/FORGET_IDENTITY':
      return initialState
    default:
      return state
  }
}