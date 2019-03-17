import { connect } from 'react-redux'
import { get } from 'lodash'
import { post } from '../Social/Social.actions'
import PostForm from './PostForm'

const stateToProps = ({ channels, form }) => ({
  hasChannel: get(channels, 'minimumPrice', false),
  thePostForm: get(form, 'post.values', false)
})

const dispatchToProps = {
  post,
}

export default connect(stateToProps, dispatchToProps)(PostForm)