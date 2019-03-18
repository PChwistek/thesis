import React, { Component, Fragment } from 'react'

import { Button, Divider, Embed, Feed } from 'semantic-ui-react'
import { getEmbedId } from '../../../helpers/utils'

class DashboardFeed extends Component {

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
    switch(post.type) {
      case 'declaration':
        return (
          <div> 
            <p> { post.body } </p>
            <p> { post.title } </p>
            <p> { post.dueDate } </p>
            <p> { post.contentType } </p>
          </div>
        )
      case 'delivery':
        return (
          <div> 
            <p> { post.title } </p>
            <p> { post.dueDate } </p>
            <p> { post.contentType } </p>
            <p> { post.body } </p>
            <Embed id={ getEmbedId(post.link) } placeholder='' source='youtube' active autoplay={ false } />
            <br />
            Satisfied?
            <br />
            <Button.Group size='small'>
              <Button>Yes</Button>
              <Button.Or />
              <Button>No</Button>
            </Button.Group>
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
    return (
      <Feed>
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