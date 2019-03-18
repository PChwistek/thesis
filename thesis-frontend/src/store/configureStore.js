import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { createStore } from 'redux'
import reducer from '../reducer'

export const history = createBrowserHistory()

const persistConfig = {
  key: 'root',
  storage,
}

const middleware = [
  routerMiddleware(history),
  createLogger({ collapsed: true },),
  thunk,
]

const persistedReducer = persistReducer(persistConfig, reducer)


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  connectRouter(history)(persistedReducer), 
  composeEnhancers(applyMiddleware(...middleware))
)

export const persistor = persistStore(store)

