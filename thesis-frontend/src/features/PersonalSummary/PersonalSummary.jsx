import React, { Component } from 'react'
import { Card, Feed, Icon } from 'semantic-ui-react'

class PersonalSummary extends Component {
  render() {
    const { first, last, username, bio, subs, account, getSubscribers } = this.props
    getSubscribers(account)
    const extra = ( 
      <a>
        <Icon name='user' />
        { subs } Subscribers
      </a>
    )
    return (
      <div>
        <Card
          image=''
          header={ `${first} ${last}` }
          meta={ username }
          description={ bio }
          extra={ extra }
        />
        <Card>
          <Card.Content>
            <Card.Header>Recent Activity</Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Label image='/images/avatar/small/jenny.jpg' />
                <Feed.Content>
                  <Feed.Date content='1 day ago' />
                  <Feed.Summary>
                    You created your account!
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
      </div>
    )
  }
}
export default PersonalSummary
