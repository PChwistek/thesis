import { connect } from 'react-redux'
import { get } from 'lodash'
import GetStarted from './GetStarted'
import { setScatter, setScatterAccount } from '../Scatter/Scatter.actions'
import { sayHello, transferMoney } from '../Blockchain/Blockchain.actions'
import { addSubscriptionToCart } from '../Subscribe/Subscribe.actions'
import { getStartedNext, getStartedBack, getStartedAt } from '../GetStarted/GetStarted.actions'

const stateToProps = ({ scatter, subscribe, getStarted }) => ({
  accountExists: !!scatter.account,
  account: scatter.account,
  unlocked: scatter.unlocked,
  subs: get(subscribe, 'subs', []),
  cart: get(subscribe, 'cart', []),
  activeIndex: get(getStarted, 'activeIndex', 0),
})

const dispatchToProps = {
  setScatter,
  setScatterAccount,
  sayHello,
  transferMoney,
  addSubscriptionToCart,
  getStartedNext,
  getStartedBack,
  getStartedAt,
}

export default connect(stateToProps, dispatchToProps)(GetStarted)