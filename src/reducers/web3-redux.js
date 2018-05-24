import { WEB3_INITIALIZED } from '../actions/web3-redux'

export default function web3(state = {}, action) {
  switch(action.type) {
    case WEB3_INITIALIZED:
      return {
        ...action.web3
      }
    default:
      return state;
  }
}