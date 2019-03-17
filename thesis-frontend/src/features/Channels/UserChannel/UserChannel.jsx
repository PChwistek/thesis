import React, { Component } from 'react'
import { Grid, Header, Segment } from 'semantic-ui-react'
import PersonalSummary from '../../PersonalSummary'
import UserSummary from './UserSummary'
import PostForm from '../../PostForm'
import AuthedApp from '../../../components/AuthedApp'
import CreateChannel from './CreateChannel'
import DashboardFeed from '../../Dashboard/DashboardFeed'


class UserChannel extends Component {
  
  componentDidMount() {
    const { channelAccount, getChannelFeed } = this.props
    getChannelFeed(channelAccount)
  }

  render() {
    const { hasChannel, theirAccount, posts, subscribe, viewing } = this.props
    if(!theirAccount) {
      return ( 
        <AuthedApp>
          <Grid columns="equal">
            <Grid.Column width={ 4 }>
              <UserSummary subscribe={ subscribe } viewing={ viewing }/>
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
    return <CreateChannel { ...this.props } />
    
  }
}

export default UserChannel