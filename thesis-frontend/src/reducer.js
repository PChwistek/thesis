import { combineReducers } from 'redux'
import scatter  from './features/Scatter/Scatter.reducer'
import subscribe from './features/Subscribe/Subscribe.reducer'

export default combineReducers({
  scatter,
  subscribe,
})