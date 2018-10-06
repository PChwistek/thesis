import i from 'icepick'

const initialState = {
  available: false,
  unlocked: false,
  isFetching: false,
  ref: null,
  account: null,
}

export default function scatter (state = initialState, action) {
  switch (action.type) {
    case 'SCATTER/SET_SCATTER_PENDING':
      return i.assoc(state, 'isFetching', true)
    case 'SCATTER/SET_SCATTER_REJECTED':
      return i.chain(state)
        .assoc('isFetching', false)
        .value()
    case 'SCATTER/SET_SCATTER_SUCCEEDED':
      return i.chain(state)
        .assoc('available', true)
        .assoc('isFetching', false)
        .assoc('unlocked', !!action.payload.identity)
        .assoc('ref', action.payload)
        .value()
    case 'SCATTER/SET_SCATTER_ACCOUNT_SUCCEEDED':
      return i.assoc(state, 'account', action.payload)
    default:
      return state
  }
}