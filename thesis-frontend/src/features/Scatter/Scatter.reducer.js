import i from 'icepick'

const initialState = {
  available: false,
  isFetching: false,
  ref: null,
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
        .assoc('ref', action.payload)
        .value()
    default:
      return state
  }
}