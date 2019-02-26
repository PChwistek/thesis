import { connect } from 'react-redux'
import { get } from 'lodash'
import { getStores } from '../Market/Market.actions'
import { authCompleted } from '../Auth/Auth.actions'
import { sayHello, subscribe } from '../Blockchain/Blockchain.actions'
import { setScatter, setScatterAccount } from '../Scatter/Scatter.actions'
import Dashboard from './Dashboard'

const stateToProps = ({ account, market, scatter, form }) => ({
  account,
  stores: market.stores,
  post: get(form, 'post'),
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
}

export default connect(stateToProps, dispatchToProps)(Dashboard)