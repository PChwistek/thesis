import { connect } from 'react-redux'
import { get } from 'lodash'
import GetStarted from './GetStarted'
import { setScatter, setScatterAccount } from '../Scatter/Scatter.actions'
import { sayHello, transferMoney } from '../Blockchain/Blockchain.actions'
import { addSubscriptionToCart } from '../Subscribe/Subscribe.actions'

const stateToProps = ({ scatter, subscribe }) => ({
  accountExists: !!scatter.account,
  account: scatter.account,
  subs: get(subscribe, 'subs', []),
  cart: get(subscribe, 'cart', []),
})

const dispatchToProps = {
  setScatter,
  setScatterAccount,
  sayHello,
  transferMoney,
  addSubscriptionToCart,
}

export default connect(stateToProps, dispatchToProps)(GetStarted)