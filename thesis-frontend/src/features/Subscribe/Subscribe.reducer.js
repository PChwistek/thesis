import i from 'icepick'

const initialState = {
  subs: [],
  cart: [],
}

export default function subscribe (state = initialState, action) {
  switch (action.type) {
    case 'SUBSCRIBE/ADD_SUBSCRIPTION_TO_CART':
      return i.merge(state, {
        cart: i.push(state.cart, action.payload),
      })
    case 'SUBSCRIBE/REMOVE_SUBSCRIPTION_FROM_CART':
      return state
    default:
      return state
  }
}