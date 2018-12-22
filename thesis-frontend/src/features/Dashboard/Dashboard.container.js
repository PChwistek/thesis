import { connect } from 'react-redux'
import { getStores } from '../Market/Market.actions'
import { authCompleted } from '../Auth/Auth.actions'
import { openStore, sayHello, subscribe } from '../Blockchain/Blockchain.actions'
import { setScatter, setScatterAccount } from '../Scatter/Scatter.actions'
import Dashboard from './Dashboard'

const stateToProps = ({ market, scatter }) => ({
  stores: market.stores,
  isScatterSet: !!scatter.ref,
  isScatterAccount: !!scatter.account,
})

const dispatchToProps = {
  getStores,
  authCompleted,
  setScatter,
  setScatterAccount,
  sayHello,
  subscribe,
  openStore,
}

export default connect(stateToProps, dispatchToProps)(Dashboard)