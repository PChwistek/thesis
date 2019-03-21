import React, { Component } from 'react'
import { Button, Card, Feed, Icon  } from 'semantic-ui-react'
import { getProjects } from '../../../RPC/RPC.actions'

class UserSummary extends Component {
  state = {
    projects: [],
    declared: 0,
    delivered: 0,
  }

  componentDidMount() {
    const { channelAccount, getChannel, isScatterAccount, setScatter } = this.props
    getChannel(channelAccount)
    if (!isScatterAccount) {
      setScatter()
    }
    getProjects(channelAccount).then(res => {
      this.setState({
        projects: res,
        declared: res.length,
        delivered: res.filter(project => project.status === 'cmplt - pass').length
      })
    })
  }

  getCorrectSubtitle(project) {
    switch(project.status) {
      case 'cmplt - pass':
        return <div>
          Delivered and Approved <Icon name="check" color="green" />
        </div>
      case 'payment pending':
        return <div>
          Payment Pending <Icon name="clock outline" color="blue" />
        </div>
      case 'in progress':
        return <div>
          Awaiting Delivery <Icon name="clock outline" color="orange" />
        </div>
      default:
        return <div>
          Failed <Icon name="close" color="red" />
        </div>
    }
  }

  render() {
    const {  viewing, subscribe, auth, theirAccount } = this.props
    const { projects } = this.state
    const subscribed = auth.subscribedTo.indexOf(viewing.account) != -1 || theirAccount
    const extra = ( 
      <div>
        <p> { viewing.minimumPrice } per cycle </p>
        <p> { viewing.subscriptions } Backers </p>
        <a>
          { subscribed  ? <div> Subscribed </div> : <Button primary onClick={ () => subscribe(viewing.account, viewing.minimumPrice) }> Subscribe </Button> }
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
            <Card.Header>Projects this cycle</Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              {
                projects.map(project => (
                  <Feed.Event key={ project.key } >
                    <Feed.Content>
                      <Feed.Summary>
                        { project.project_name }
                      </Feed.Summary>
                      <Feed.Extra text>
                        { this.getCorrectSubtitle(project) }
                      </Feed.Extra>
                    </Feed.Content>
                  </Feed.Event>
                ))
              }
            </Feed>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>Channel Statistics</Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                    Fulfillment Rate: 100%
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                    Projects declared for this cycle: { this.state.declared }
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                    Projects delivered this cycle: { this.state.delivered }
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