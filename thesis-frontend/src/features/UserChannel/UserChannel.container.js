import { connect } from 'react-redux'
import { openChannel, subscribe } from '../Blockchain/Blockchain.actions'
import { getChannelFeed } from '../Social/Social.actions'
import UserChannel from './UserChannel'
import { get } from 'lodash'

const stateToProps = ({ auth, router, social }) => ({
  auth,
  posts: get(social, 'channelPosts', []),
  channelName: get(router, 'location.state.key', '')
})

const dispatchToProps = {
  openChannel,
  subscribe,
  getChannelFeed,
}

export default connect(stateToProps, dispatchToProps)(UserChannel)