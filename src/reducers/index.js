import { combineReducers } from 'redux'
import authedUser from './authedUser'
import web3 from './web3-redux'

export default combineReducers({
  authedUser,
  web3
})