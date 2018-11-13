import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import Routes from './features/Routes'
import { ConnectedRouter } from 'connected-react-router'
import { store, history } from './store/configureStore'
import Header from './components/Navigation/Header'
import 'bulma/css/bulma.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faPenSquare } from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope, faKey, faPenSquare)

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <div>
        <Header />
        <Routes />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
