export const SET_SUBSCRIPTION_STORE = 'SET_SUBSCRIPTION_STORE'

export function setSubscriptionStore (address){
  return {
    type: SET_SUBSCRIPTION_STORE,
    address
  }
}


