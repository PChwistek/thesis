import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import Routes from './features/Routes'
import { ConnectedRouter } from 'connected-react-router'
import { store, history } from './store/configureStore'

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <div> 
        <Routes />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
