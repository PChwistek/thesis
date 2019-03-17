import React, { Component } from 'react'
import { Button, Card, Feed } from 'semantic-ui-react'

class UserSummary extends Component {

  componentDidMount() {
    const { channelAccount, getChannel, isScatterAccount, setScatter } = this.props
    getChannel(channelAccount)
    if (!isScatterAccount) {
      setScatter()
    }
  }
  render() {
    const {  viewing, subscribe, auth } = this.props    
    const subscribed = auth.subscribedTo.indexOf(viewing.account) != -1
    const extra = ( 
      <div>
        <p> { viewing.subscriptions } Backers </p>
        <a>
          { subscribed ? <div> Subscribed </div> : <Button primary onClick={ () => subscribe(viewing.account, viewing.minimumPrice) }> Subscribe </Button> }
        </a>
      </div>
    )
    return (
      <div>
        <Card
          image=''
          header={ viewing.channelName }
          meta={ viewing.username }
          description={ viewing.description }
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
                  <Feed.Summary>
                    Fulfillment Rate: 100%
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Label image='/images/avatar/small/jenny.jpg' />
                <Feed.Content>
                  <Feed.Summary>
                    Projects declared for this cycle: 
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Label image='/images/avatar/small/jenny.jpg' />
                <Feed.Content>
                  <Feed.Summary>
                    Projects delivered this cycle:
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