/* eslint-disable */
import React, { Component } from 'react'
import { Button, Divider, Grid, Header, Icon, Search, Segment } from 'semantic-ui-react'

import './CreateAccountTiles.scss'
import imgScatter from '../../../../static/images/scatter.png'

class CreateAccountTiles extends Component {

  render() {
    const { getStartedNext } = this.props

    return (
      <Segment placeholder>
        <Grid columns={2} stackable textAlign='center'>
          <Divider vertical>Or</Divider>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <Header icon>
                I have ScatterJS installed
                <br /> 
                <img src={ imgScatter} /> 
              </Header>
              <Button primary onClick={ getStartedNext }>Continue</Button>
            </Grid.Column>
            <Grid.Column>
              <Header icon>
                I don't have ScatterJS installed
                (coming soon)
              </Header>
              <Button primary disabled>Create</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default CreateAccountTiles