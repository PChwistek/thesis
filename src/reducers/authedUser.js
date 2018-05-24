import { SET_AUTHED_USER } from '../actions/authedUser'

export default function setAuthedUser(state = {}, action) {
  switch(action.type){
    case SET_AUTHED_USER:
      return action.address
    default:
      return state;
  }
}