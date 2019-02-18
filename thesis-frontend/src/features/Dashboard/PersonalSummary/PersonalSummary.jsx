import React, { Component } from 'react'
import { Card, Feed, Icon } from 'semantic-ui-react'



class PersonalSummary extends Component {
  render() {
    const extra = ( 
      <a>
        <Icon name='user' />
        16 Friends
      </a>
    )
    return (
      <div>
        <Card
          image=''
          header='Elliot Baker'
          meta='You'
          description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
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
