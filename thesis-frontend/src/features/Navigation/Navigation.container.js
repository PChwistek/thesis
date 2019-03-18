import { connect } from 'react-redux'
import { loginScatter, logout } from '../Auth/Auth.actions'
import Navigation from './Navigation'

const stateToProps = ({ auth }) => ({
  token: auth.token,
  account: auth.account,
})

const dispatchToProps = {
  loginScatter,
  logout,
}

export default connect(stateToProps, dispatchToProps)(Navigation)