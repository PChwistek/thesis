import { connect } from 'react-redux'
import Profile from './Profile'
import { sayHello } from '../Blockchain/Blockchain.actions'
import { setScatter } from '../Scatter/Scatter.actions'

const stateToProps = ({ scatter }) => ({
  isScatterAccount: !!scatter.account,
})

const dispatchToProps = {
  sayHello,
  setScatter,
}

export default connect(stateToProps, dispatchToProps)(Profile)