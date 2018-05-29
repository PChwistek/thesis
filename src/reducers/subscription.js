import { SET_SUBSCRIPTION_STORE } from '../actions/subscription'

export default function setSubscriptionStore(state = null, action) {
  switch(action.type) {
    case SET_SUBSCRIPTION_STORE:
      return action.address
    default:
      return state
  }
}