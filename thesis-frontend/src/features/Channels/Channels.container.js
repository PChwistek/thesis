import { connect } from 'react-redux'
import { getChannels } from '../RPC/RPC.actions'
import { goToChannel } from './Channel.actions'
import Channels from './Channels'
import { get } from 'lodash'

const stateToProps = ({ rpc }) => ({
  channels: get(rpc, 'channels', []),
})

const dispatchToProps = {
  getChannels,
  goToChannel,
}

export default connect(stateToProps, dispatchToProps)(Channels)