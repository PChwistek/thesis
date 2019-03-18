import { connect } from 'react-redux'
import { get } from 'lodash'
import { post, getProjects } from '../Social/Social.actions'
import { declareProject, deliverProject } from '../Blockchain/Blockchain.actions'
import { setScatter } from '../Scatter/Scatter.actions'

import PostForm from './PostForm'

const stateToProps = ({ scatter, channels, form, social }) => ({
  isScatterAccount: !!scatter.account,
  hasChannel: get(channels, 'minimumPrice', false),
  thePostForm: get(form, 'post.values', false),
  projects: get(social, 'projects', [])
})

const dispatchToProps = {
  post,
  declareProject,
  deliverProject,
  setScatter,
  getProjects,
}

export default connect(stateToProps, dispatchToProps)(PostForm)