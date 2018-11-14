import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import scatter  from './features/Scatter/Scatter.reducer'
import subscribe from './features/Subscribe/Subscribe.reducer'
import getStarted from './features/GetStarted/GetStarted.reducer'

export default combineReducers({
  scatter,
  subscribe,
  getStarted,
  form,
})