export const addSubscriptionToCart = creator => (dispatch) => dispatch({
  type: 'SUBSCRIBE/ADD_SUBSCRIPTION_TO_CART',
  payload: creator,
})

export const removingSubscriptionFromCart = creator => (dispatch) => dispatch({
  type: 'SUBSCRIBE/REMOVE_SUBCRIPTION_FROM_CART',
  payload: creator,
})

export const clearSubscriptionCart = () => dispatch => dispatch({
  type: 'SUBSCRIBE/CLEAR_SUBSCRIPTION_CART',
})