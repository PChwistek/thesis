import i from 'icepick'

const initialState = {
  showScatterModal: false,
}

export default function blockchain (state = initialState, action) {
  switch (action.type) {
    case 'BLOCKCHAIN/SAY_HELLO_PENDING':
      return i.assoc(state, 'showScatterModal', true)
    case 'BLOCKCHAIN/SAY_HELLO_FULFILLED':
      return i.assoc(state, 'showScatterModal', false)
    case 'BLOCKCHAIN/SAY_HELLO_REJECTED':
      return i.assoc(state, 'showScatterModal', false)
    case 'BLOCKCHAIN/OPEN_STORE_PENDING':
      return i.assoc(state, 'showScatterModal', true)
    case 'BLOCKCHAIN/OPEN_STORE_FULFILLED':
      return i.assoc(state, 'showScatterModal', false)
    case 'BLOCKCHAIN/OPEN_STORE_REJECTED':
      return i.assoc(state, 'showScatterModal', false)
    case 'BLOCKCHAIN/SUBSCRIBE_PENDING':
      return i.assoc(state, 'showScatterModal', true)
    case 'BLOCKCHAIN/SUBSCRIBE_FULFILLED':
      return i.assoc(state, 'showScatterModal', false)
    case 'BLOCKCHAIN/SUBSCRIBE_REJECTED':
      return i.assoc(state, 'showScatterModal', false)
    default:
      return state
  }
}