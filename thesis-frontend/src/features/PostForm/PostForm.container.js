import { connect } from 'react-redux'
import { get } from 'lodash'
import { post } from '../Social/Social.actions'
import PostForm from './PostForm'

const stateToProps = ({ channels }) => ({
  hasChannel: get(channels, 'minimumPrice', false)
})

const dispatchToProps = {
  post,
}

export default connect(stateToProps, dispatchToProps)(PostForm)