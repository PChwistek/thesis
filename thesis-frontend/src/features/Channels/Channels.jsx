import React, { Component } from 'react'
import { Dropdown, Grid, Input, Segment } from 'semantic-ui-react'
import AuthedApp from '../../components/AuthedApp'

class Channels extends Component {
  render() {
    const options = [
      { key: 'culture', text: 'Culture', value: 'culture' },
      { key: 'comedy', text: 'Comedy', value: 'comedy' },
      { key: 'entertainment', text: 'Entertainment', value: 'entertainment' },
      { key: 'education', text: 'Education', value: 'educational' },
      { key: 'video', text: 'Video', value: 'video' },
      { key: 'podcast', text: 'Podcast', value: 'podcast' },
      { key: 'music', text: 'Music', value: 'music' },
      { key: 'art', text: 'Art', value: 'art' },
      { key: 'politics', text: 'Politics', value: 'politics' },
      { key: 'tech', text: 'Tech', value: 'tech' },
      { key: 'film', text: 'Film', value: 'film' },
      { key: 'diy', text: 'DIY', value: 'diy' },
    ]
    return (
      <AuthedApp>
        <Segment>
          <Grid columns="equal" relaxed="very">
            <Grid.Column width={ 6 }>
              <Input fluid placeholder="Search..." />
            </Grid.Column>
            <Grid.Column>
              <Dropdown placeholder='Tags' fluid multiple selection options={ options } />
            </Grid.Column>
          </Grid>
        </Segment>
      </AuthedApp>
    )
  }
}

export default Channels