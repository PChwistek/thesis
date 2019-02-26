import React, { Component } from 'react'
import { Button, Container, Grid, Header, Segment } from 'semantic-ui-react'
import { get } from 'lodash'
import UserSummary from './UserSummary'
import PostForm from '../PostForm'
import AuthedApp from '../../components/AuthedApp'

class UserChannel extends Component {
  render() {
    const { account, openChannel } = this.props
    if(get(account, 'hasChannel', false)) {
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
    return (
      <AuthedApp>
        <Container>
          <Header 
            as="h4"
            content="You don't have a channel, would you like to open one?"
            style={ {
              fontSize: '4em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: '3em'
            } } 
          />
          <Button primary onClick={ () => openChannel('1.0000') }> Yes </Button>
        </Container>
      </AuthedApp>
    )
  }
}

export default UserChannel