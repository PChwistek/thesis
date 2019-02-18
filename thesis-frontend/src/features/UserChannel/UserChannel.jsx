import React, { Component } from 'react'
import { Grid, Header, Segment } from 'semantic-ui-react'

import UserSummary from './UserSummary'
import PostForm from '../PostForm'
import AuthedApp from '../../components/AuthedApp'

class UserChannel extends Component {
  render() {
    return (
      <AuthedApp>
        <Grid columns="equal">
          <Grid.Column width={ 4 }>
            <UserSummary />
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <PostForm />
            </Segment>
            <Segment>
              <Header as='h2'>Post History</Header>
            </Segment>
          </Grid.Column>
        </Grid>
      </AuthedApp>
    )
  }
}

export default UserChannel