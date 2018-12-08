import i from 'icepick'

const initialState = {
  stores: [],
}

export default function scatter (state = initialState, action) {
  switch (action.type) {
    case 'MARKET/GET_STORES':
      return i.assoc(state, 'stores', action.payload.rows)
    default:
      return state
  }
}