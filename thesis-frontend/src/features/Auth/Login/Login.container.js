import { connect } from 'react-redux'
import Login from './Login'
import { loginScatter } from '../Auth.actions'
import { setScatter, setScatterAccount } from '../../Scatter/Scatter.actions'

const stateToProps = ({ scatter, auth }) => ({
  auth,
  identity: scatter.identity,
  available: scatter.available,
  isFetchingAccount: scatter.isFetchingAccount,
})

const dispatchToProps = {
  setScatter,
  setScatterAccount,
  loginScatter,
}

export default connect(stateToProps, dispatchToProps)(Login)