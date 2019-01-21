import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import Routes from './features/Routes'
import { ConnectedRouter } from 'connected-react-router'
import { history, store } from './store/configureStore'
import 'semantic-ui-css/semantic.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faKey, faPenSquare } from '@fortawesome/free-solid-svg-icons'

library.add(faEnvelope, faKey, faPenSquare)

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
