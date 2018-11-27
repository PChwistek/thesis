import { connect } from 'react-redux'
import { getStores } from '../Market/Market.actions'
import { authCompleted } from '../Auth/Auth.actions'
import { sayHello, transferMoney } from '../Blockchain/Blockchain.actions'
import { addSubscriptionToCart } from '../Subscribe/Subscribe.actions'
import Dashboard from './Dashboard'

const stateToProps = ({ market }) => ({
  stores: market.stores,
})

const dispatchToProps = {
  getStores,
  authCompleted,
  sayHello,
  transferMoney,
  addSubscriptionToCart,
}

export default connect(stateToProps, dispatchToProps)(Dashboard)