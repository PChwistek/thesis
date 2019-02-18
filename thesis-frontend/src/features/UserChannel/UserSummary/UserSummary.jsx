import React, { Component } from 'react'
import { Button, Card, Feed } from 'semantic-ui-react'

class UserSummary extends Component {
  render() {
    const extra = ( 
      <a>
        <Button primary>Subscribe</Button>
      </a>
    )
    return (
      <div>
        <Card
          image=''
          header='Elliot Baker'
          meta='Creator'
          description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
          extra={ extra }
        />
        <Card>
          <Card.Content>
            <Card.Header>Channel Statistics</Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Label image='/images/avatar/small/jenny.jpg' />
                <Feed.Content>
                  <Feed.Date content='1 day ago' />
                  <Feed.Summary>
                    You did stuff!
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

export default UserSummary