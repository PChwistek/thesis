import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import scatter  from './features/Scatter/Scatter.reducer'
import subscribe from './features/Subscribe/Subscribe.reducer'
import auth from './features/Auth/Auth.reducer'
import blockchain from './features/Blockchain/Blockchain.reducer'
import market from './features/Market/Market.reducer'

export default combineReducers({
  auth,
  scatter,
  subscribe,
  blockchain,
  market,
  form,
})