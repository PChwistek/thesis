import { connect } from 'react-redux'
import { authCompleted } from '../Auth/Auth.actions'
import { sayHello, subscribe } from '../Blockchain/Blockchain.actions'
import { setScatter, setScatterAccount } from '../Scatter/Scatter.actions'
import { getSubscribers } from '../RPC/RPC.actions'
import Dashboard from './Dashboard'

const stateToProps = ({ account, rpc, scatter }) => ({
  account,
  stores: rpc.stores,
  isScatterSet: !!scatter.ref,
  isScatterAccount: !!scatter.account,
})

const dispatchToProps = {
  getSubscribers,
  authCompleted,
  setScatter,
  setScatterAccount,
  sayHello,
  subscribe,
}

export default connect(stateToProps, dispatchToProps)(Dashboard)