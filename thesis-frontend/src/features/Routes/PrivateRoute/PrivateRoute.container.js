import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'

const stateToProps = ({ auth }) => ({
  token: auth.token,
})

const dispatchToProps = {
}

export default connect(stateToProps, dispatchToProps)(PrivateRoute)