import { connect } from 'react-redux'
import { getStores } from '../Market/Market.actions'
import { authCompleted } from '../Auth/Auth.actions'
import { sayHello, openStore, subscribe } from '../Blockchain/Blockchain.actions'
import Dashboard from './Dashboard'

const stateToProps = ({ market }) => ({
  stores: market.stores,
})

const dispatchToProps = {
  getStores,
  authCompleted,
  sayHello,
  subscribe,
  openStore,
}

export default connect(stateToProps, dispatchToProps)(Dashboard)