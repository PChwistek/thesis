import React, { Component } from 'react'

import { Feed, Icon } from 'semantic-ui-react'

class DashboardFeed extends Component {
  render() {
    return (
      <Feed>
        <Feed.Event>
          <Feed.Label>
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>Elliot Fu</Feed.User> added you as a friend
              <Feed.Date>1 Hour Ago</Feed.Date>
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Like>
                <Icon name='like' />
                4 Likes
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label />
          <Feed.Content>
            <Feed.Summary>
              <a>Helen Troy</a> added <a>2 new illustrations</a>
              <Feed.Date>4 days ago</Feed.Date>
            </Feed.Summary>
            <Feed.Extra images>
              <a>
                <img src='/images/wireframe/image.png' />
              </a>
              <a>
                <img src='/images/wireframe/image.png' />
              </a>
            </Feed.Extra>
            <Feed.Meta>
              <Feed.Like>
                <Icon name='like' />
                1 Like
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>

      </Feed>
    )
  }
}

export default DashboardFeed