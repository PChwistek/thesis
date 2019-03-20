import React, { Component } from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import AuthedApp from '../AuthedApp'
import { Link } from 'react-router-dom'
import PersonalSummary from '../PersonalSummary'
import PostForm from '../PostForm'
import DashboardFeed from './DashboardFeed'
import './Dashboard.scss'

class Dashboard extends Component {

  sayHello = () => {
    const { sayHello } = this.props
    sayHello()
  }

  subscribe = cart => {
    const { transferMoney } = this.props
    cart.map(account => transferMoney(account))
  }

  openStore = () => {
    const { openStore } = this.props
    openStore('1.0000')
  }

  componentDidMount() {
    const { authCompleted, getFeed, getUserChannel, auth } = this.props
    authCompleted()
    getFeed()
    getUserChannel(auth.account)
  
  }

  render() {
    const { auth, subbedChannels } = this.props

    return (
      <AuthedApp>
        <Grid columns="equal">
          <Grid.Column>
            <PersonalSummary />
          </Grid.Column>
          <Grid.Column width={ 8 }>
            <Segment>
              <PostForm hasChannel={ auth.hasChannel } />
            </Segment>
            <Segment>
              <DashboardFeed { ...this.props } />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              Subscriptions
              {
                subbedChannels.map((channel, index) => {
                  return (
                    <div key={ index }>
                      <br />
                      <Link to={
                        {
                          pathname: '/channel',
                          state: {
                            key: channel.account,
                          }
                        }
                      }>
                        <p> { channel.channelName } </p>
                      </Link>
                    </div>
                  )
                })
              }
            </Segment>
          </Grid.Column>
        </Grid>
      </AuthedApp>
    )
  }
}

export default Dashboard