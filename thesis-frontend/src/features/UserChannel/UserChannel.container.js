import { connect } from 'react-redux'
import { openChannel } from '../Blockchain/Blockchain.actions'
import UserChannel from './UserChannel'

const stateToProps = ({ account }) => ({
  account,
  userChannel: true,
})

const dispatchToProps = {
  openChannel,
}

export default connect(stateToProps, dispatchToProps)(UserChannel)