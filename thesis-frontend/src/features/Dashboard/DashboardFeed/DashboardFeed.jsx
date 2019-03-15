import React, { Component } from 'react'

import { Feed, Icon } from 'semantic-ui-react'

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
  
  render() {
    const { posts } = this.props
    return (
      <Feed>
        { posts.length > 0
          ? posts.map((post,index) => (
            <Feed.Event key={ index }>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>{ post.user } </Feed.User> { this.getAppropriateSummary(post) }
                  <Feed.Date>{ post.time } </Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                  { post.projectTitle }
                  { post.body }
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