import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createStore } from 'redux'
import reducer from '../reducer'

export const history = createBrowserHistory()

const middleware = [
  routerMiddleware(history),
  createLogger({ collapsed: true }),
  thunk,
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  connectRouter(history)(reducer), 
  composeEnhancers(applyMiddleware(...middleware))
)


