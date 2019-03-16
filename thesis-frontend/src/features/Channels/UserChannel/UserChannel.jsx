import React, { Component } from 'react'
import { Grid, Header, Segment } from 'semantic-ui-react'
import { get } from 'lodash'
import PersonalSummary from '../../PersonalSummary'
import UserSummary from './UserSummary'
import PostForm from '../../PostForm'
import AuthedApp from '../../../components/AuthedApp'
import CreateChannel from './CreateChannel'
import DashboardFeed from '../../Dashboard/DashboardFeed'


class UserChannel extends Component {
  
  componentDidMount() {
    const { auth, channelAccount, getChannelFeed } = this.props
    if(get(auth, 'hasChannel', true) && channelAccount == '') {
      getChannelFeed(auth.username)
    } else {
      getChannelFeed(channelAccount)
    }
  }

  render() {
    const { hasChannel, theirAccount, channelAccount, posts, subscribe } = this.props
    if(!theirAccount) {
      return ( 
        <AuthedApp>
          <Grid columns="equal">
            <Grid.Column width={ 4 }>
              { channelAccount === '' ? <PersonalSummary /> : <UserSummary subscribe={ subscribe }/>}
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
              { channelAccount === '' ? <PersonalSummary /> : <UserSummary />}
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