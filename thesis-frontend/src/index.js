import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import Routes from './features/Routes'
import { ConnectedRouter } from 'connected-react-router'
import { history, store, persistor } from './store/configureStore'
import 'semantic-ui-css/semantic.min.css'
import { PersistGate } from 'redux-persist/integration/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faKey, faPenSquare } from '@fortawesome/free-solid-svg-icons'
library.add(faEnvelope, faKey, faPenSquare)

ReactDOM.render(
  <Provider store={ store }>
    <PersistGate loading={ null } persistor={ persistor }>
      <ConnectedRouter history={ history }>
        <div>
          <Routes />
        </div>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
