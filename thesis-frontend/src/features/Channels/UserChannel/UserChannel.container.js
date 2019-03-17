import { connect } from 'react-redux'
import { openChannel, subscribe } from '../../Blockchain/Blockchain.actions'
import { setScatter } from '../../Scatter/Scatter.actions'
import { getChannel } from '../../Channels/Channel.actions'
import { getChannelFeed } from '../../Social/Social.actions'
import UserChannel from './UserChannel'
import { get } from 'lodash'

const stateToProps = ({ auth, router, social, channels, scatter }) => ({
  auth,
  account: auth.account,
  hasChannel: get(channels, 'minimumPrice', false),
  isScatterAccount: !!scatter.account,
  posts: get(social, 'channelPosts', []),
  channelAccount: get(router, 'location.state.key', ''),
  theirAccount: auth.account === get(router, 'location.state.key', ''),
  viewing: channels.viewing
})

const dispatchToProps = {
  openChannel,
  subscribe,
  getChannelFeed,
  getChannel,
  setScatter,
}

export default connect(stateToProps, dispatchToProps)(UserChannel)