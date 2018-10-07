import { connect } from 'react-redux'
import GetStarted from './GetStarted'
import { setScatter, setScatterAccount } from '../Scatter/Scatter.actions'
import { sayHello } from '../Blockchain/Blockchain.actions'

const stateToProps = ({ scatter }) => ({
  accountExists: !!scatter.account,
  account: scatter.account,
})

const dispatchToProps = {
  setScatter,
  setScatterAccount,
  sayHello,
}

export default connect(stateToProps, dispatchToProps)(GetStarted)