import React, { Component } from 'react'
import { Grid, Header, Segment } from 'semantic-ui-react'
import PersonalSummary from '../../PersonalSummary'
import UserSummary from './UserSummary'
import PostForm from '../../PostForm'
import AuthedApp from '../../AuthedApp'
import CreateChannel from './CreateChannel'
import DashboardFeed from '../../Dashboard/DashboardFeed'


class UserChannel extends Component {
  
  componentDidMount() {
    const { channelAccount, getChannelFeed } = this.props
    getChannelFeed(channelAccount)

  }

  render() {
    const { hasChannel, theirAccount, posts } = this.props
    if(!theirAccount) {
      return ( 
        <AuthedApp>
          <Grid columns="equal">
            <Grid.Column width={ 4 }>
              <UserSummary { ...this.props } />
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as='h2'>Post History</Header>
              </Segment>
              <Segment>
                <DashboardFeed posts={ posts } />
              </Segment>
            </Grid.Column>
          </Grid>
        </AuthedApp>
      )
    }
    if(theirAccount && hasChannel) {
      return (
        <AuthedApp>
          <Grid columns="equal">
            <Grid.Column width={ 4 }>
              <PersonalSummary />
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <PostForm hasChannel={ true }/>
              </Segment>
              <Segment>
                <DashboardFeed posts={ posts } />
              </Segment>
            </Grid.Column>
          </Grid>
        </AuthedApp>
      )
    }
    return (
      <AuthedApp>
        <CreateChannel { ...this.props } />
      </AuthedApp>
    )
    
  }
}

export default UserChannel