import { connect } from 'react-redux'
import Navigation from './Navigation'

const stateToProps = ({ auth }) => ({
  completed: auth.completed,
})

const dispatchToProps = {
}

export default connect(stateToProps, dispatchToProps)(Navigation)