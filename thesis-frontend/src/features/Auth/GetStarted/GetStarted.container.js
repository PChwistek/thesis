import { connect } from 'react-redux'
import { get } from 'lodash'
import GetStarted from './GetStarted'
import { setScatter, setScatterAccount } from '../../Scatter/Scatter.actions'
import { getStartedNext, getStartedBack, getStartedAt } from '../Auth.actions'

const stateToProps = ({ scatter, subscribe, auth }) => ({
  accountExists: !!scatter.account,
  account: scatter.account,
  identity: get(scatter, 'ref.identity', {}),
  unlocked: scatter.unlocked,
  subs: get(subscribe, 'subs', []),
  cart: get(subscribe, 'cart', []),
  activeIndex: get(auth, 'activeIndex', 0),
})

const dispatchToProps = {
  setScatter,
  setScatterAccount,
  getStartedNext,
  getStartedBack,
  getStartedAt,
}

export default connect(stateToProps, dispatchToProps)(GetStarted)