import React, { Component } from 'react'
import { Dropdown, Grid, Item, Input, Segment } from 'semantic-ui-react'
import AuthedApp from '../../components/AuthedApp'
import { options } from './ChannelTags'

class Channels extends Component {
  componentDidMount() {
    const { getChannels } = this.props
    getChannels()
  }

  toChannel(key) {
    const { goToChannel } = this.props
    goToChannel(key)
  }

  render() {
    const { channels } = this.props
   
    const items = channels.map((channel,index) => ({
      childKey: index,
      image: '/',
      description: '',
      header: 'channel name',
      meta: channel.key,
      extra: 'Projects Declared: ' + channel.total_proj,
      onClick: () => this.toChannel(channel.key),
    }))
  
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
        <Segment>
          <Item.Group link items={ items } />
        </Segment>
      </AuthedApp>
    )
  }
}

export default Channels