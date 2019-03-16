import { connect } from 'react-redux'
import { authCompleted } from '../Auth/Auth.actions'
import { sayHello, subscribe } from '../Blockchain/Blockchain.actions'
import { setScatter, setScatterAccount } from '../Scatter/Scatter.actions'
import { getUserChannel } from '../Channels/Channel.actions'
import { getFeed } from '../Social/Social.actions' 
import Dashboard from './Dashboard'
import { get } from 'lodash'

const stateToProps = ({ auth, rpc, social }) => ({
  auth,
  stores: rpc.stores,
  posts: get(social, 'posts', [])
})

const dispatchToProps = {
  getUserChannel,
  getFeed,
  authCompleted,
  setScatter,
  setScatterAccount,
  sayHello,
  subscribe,
}

export default connect(stateToProps, dispatchToProps)(Dashboard)