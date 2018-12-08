import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'

const stateToProps = ({ auth }) => ({
  authenticated: auth.authenticated,
})

const dispatchToProps = {
}

export default connect(stateToProps, dispatchToProps)(PrivateRoute)