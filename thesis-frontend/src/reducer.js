import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import scatter  from './features/Scatter/Scatter.reducer'
import subscribe from './features/Subscribe/Subscribe.reducer'
import auth from './features/Auth/Auth.reducer'
import blockchain from './features/Blockchain/Blockchain.reducer'
import account from './features/Account/Account.reducer'
import rpc from './features/RPC/RPC.reducer'

export default combineReducers({
  auth,
  account,
  scatter,
  subscribe,
  blockchain,
  rpc,
  form,
})