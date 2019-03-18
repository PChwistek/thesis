import { connect } from 'react-redux'
import { get } from 'lodash'
import PersonalSummary from './PersonalSummary'

const stateToProps = ({ auth, channels }) => ({
  account: get(auth, 'account'),
  subs: get(channels, 'subscriptions', 0),
  first: get(auth, 'first'),
  last: get(auth, 'last'),
  username: get(auth, 'username')
})

const dispatchToProps = {
  
}

export default connect(stateToProps, dispatchToProps)(PersonalSummary)