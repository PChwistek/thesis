import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import scatter  from './features/Scatter/Scatter.reducer'
import subscribe from './features/Subscribe/Subscribe.reducer'
import auth from './features/Auth/Auth.reducer'
import blockchain from './features/Blockchain/Blockchain.reducer'
import social from './features/Social/Social.reducer'
import channels from './features/Channels/Channels.reducer'
import rpc from './features/RPC/RPC.reducer'

export default combineReducers({
  auth,
  scatter,
  subscribe,
  blockchain,
  rpc,
  social,
  form,
  channels,
})