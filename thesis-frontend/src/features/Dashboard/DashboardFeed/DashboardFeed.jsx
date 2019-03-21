import React, { Component, Fragment } from 'react'
import { Button, Divider, Header, Embed, Feed, Segment } from 'semantic-ui-react'
import { getEmbedId } from '../../../helpers/utils'
import { getPoll, getProject } from '../../RPC/RPC.actions'
import ProjectModal from '../../ProjectModal'

class DashboardFeed extends Component {

  state={
    post: '',
    open: false,
  }

  async openModal(post) {
    const thePoll = await getPoll(post.account, post.blockchainKey, 'nps')
    const theProject = await getProject(post.account, post.title)
    this.setState({
      post: {
        ...thePoll,
        ...theProject,
      },
      open: true,
    })
  }

  closeModal = () => {
    this.setState({
      open: false,
    })
  }

  handleVote = (satisfied, post) => {
    const { vote } = this.props
    getPoll(post.account, post.projectKey, 'nps').then(res => {
      vote(satisfied, post.account, post.projectKey, res.key)
    })
  }

  getAppropriateSummary(post) {
    switch(post.type) {
      case 'declaration':
        return (<span> declared a project </span>)
      case 'delivery':
        return (<span> fulfilled a project </span>)
      case 'extension':
        return (<span> filed for an extension </span> )
      default:
        return (<span> posted an update </span>)
    }
  }

  getAppropriatePostBody(post) {
    const { auth } = this.props
    const userOwned = auth.account === post.account
    switch(post.type) {
      case 'declaration':
        return (
          <div>
            <p> { post.body } </p>
            <Segment placeholder textAlign="center" onClick={ () => this.openModal(post) } className={ 'clickable' }>
              <Header> { post.title } </Header>
              <p> Due date: { post.dueDate } </p>
              <p> Content type: { post.contentType } </p>
              <p> Promised Length: { post.contentType } </p>
            </Segment> 
          </div>
        )
      case 'delivery':
        return (
          <div> 
            <p> { post.body } </p>
            <Embed id={ getEmbedId(post.link) } placeholder='' source='youtube' active autoplay={ false } />
            <Segment placeholder textAlign="center" onClick={ () => this.openModal(post) } className={ 'clickable' }>
              <Header> { post.title } </Header>
              {
                !userOwned 
                  ? <div>
                    <p> Satisfied? </p>
                    <Button.Group size='small'>
                      <Button onClick={ () => this.handleVote(true, post) }>Yes</Button>
                      <Button.Or />
                      <Button onClick={ () => this.handleVote(false, post) }>No</Button>
                    </Button.Group>
                  </div>
                  : <div>
                    Click to view statistics...
                  </div>
              }
             
            </Segment> 
          </div>
        )
      case 'extension':
        return (
          <div> 
            plz be merciful 
          </div> 
        )
      default:
        return (
          <div> 
            <p> { post.body } </p>
          </div>
        )
    }
  }
  
  render() {
    const { posts } = this.props
    const { open, post } = this.state
    return (
      <Feed>
        <ProjectModal open={ open } close={ this.closeModal } post={ post } />
        { posts[0] && posts.length > 0
          ? posts.map((post,index) => (
            <Fragment>
              <Feed.Event key={ index }>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User>{ post.user } </Feed.User> { this.getAppropriateSummary(post) }
                    <Feed.Date>{ post.time } </Feed.Date>
                  </Feed.Summary>
                  <Feed.Extra text>
                    { this.getAppropriatePostBody(post) }
                  </Feed.Extra>
                </Feed.Content>
              </Feed.Event>
              <Divider />
            </Fragment>
          ))
          : <div> Nothing here! </div>
        }
      </Feed>
    )
  }
}

export default DashboardFeed