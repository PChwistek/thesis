import i from 'icepick'

const initialState = {
  available: false,
  unlocked: false,
  isFetching: false,
  isFetchingAccount: false,
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
      return i.chain(state)
        .assoc('account', action.payload)
        .assoc('isFetchingAccount', false)
        .value()
    case 'SCATTER/SET_SCATTER_ACCOUNT_PENDING':
      return i.assoc(state, 'isFetchingAccount', true)
    case 'SCATTER/SET_SCATTER_ACCOUNT_REJECTED':
      return i.assoc(state, 'isFetchingAccount', false)
    default:
      return state
  }
}