import { connect } from 'react-redux'
import { getChannels } from '../RPC/RPC.actions'
import Channels from './Channels'

const stateToProps = () => ({
})

const dispatchToProps = {
  getChannels,
}

export default connect(stateToProps, dispatchToProps)(Channels)