import { connect } from 'react-redux'
import { goToChannel, getChannels } from './Channel.actions'
import Channels from './Channels'
import { get } from 'lodash'

const stateToProps = ({ channels }) => ({
  channels: get(channels, 'channels', []),
})

const dispatchToProps = {
  getChannels,
  goToChannel,
}

export default connect(stateToProps, dispatchToProps)(Channels)