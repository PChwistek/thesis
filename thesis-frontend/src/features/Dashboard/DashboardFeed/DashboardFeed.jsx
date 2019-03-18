import React, { Component } from 'react'

import { Embed, Feed, Icon } from 'semantic-ui-react'
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
    console.log(posts)
    return (
      <Feed>
        { posts[0] && posts.length > 0
          ? posts.map((post,index) => (
            <Feed.Event key={ index }>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>{ post.user } </Feed.User> { this.getAppropriateSummary(post) }
                  <Feed.Date>{ post.time } </Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                  { this.getAppropriatePostBody(post) }
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />
                    0 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          ))
          : <div> Nothing here! </div>
        }
      </Feed>
    )
  }
}

export default DashboardFeed