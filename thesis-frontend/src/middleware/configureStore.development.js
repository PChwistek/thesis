import { createLogger } from 'redux-logger'
import { applyMiddleware, compose } from 'redux'

const middleware = [
  createLogger({ collapsed: true, predicate: (getState, action) => !action.type.startsWith('SCROLL') }),
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default composeEnhancers(applyMiddleware(...middleware))