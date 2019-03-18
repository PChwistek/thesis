import { connect } from 'react-redux'
import AuthedApp from './AuthedApp'

const stateToProps = ({ blockchain }) => ({
  showScatterModal: blockchain.showScatterModal,
})

const dispatchToProps = {
}

export default connect(stateToProps, dispatchToProps)(AuthedApp)