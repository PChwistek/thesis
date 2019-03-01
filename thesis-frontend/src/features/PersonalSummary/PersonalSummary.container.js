import { connect } from 'react-redux'
import { get } from 'lodash'
import { getSubscribers } from '../RPC/RPC.actions'
import PersonalSummary from './PersonalSummary'

const stateToProps = ({ auth, rpc }) => ({
  account: get(auth, 'account'),
  subs: get(rpc, 'subscribers'),
  first: get(auth, 'first'),
  last: get(auth, 'last'),
  username: get(auth, 'email')
})

const dispatchToProps = {
  getSubscribers,
}

export default connect(stateToProps, dispatchToProps)(PersonalSummary)