import React, { Component } from 'react'
import { Button, Dropdown, Grid, Item, Input, Segment } from 'semantic-ui-react'
import AuthedApp from '../AuthedApp'
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

    const extra = (channel) => (
      <div>
        <br />
        <span> { channel.subscriptions } Subscribed </span>
        <br />
        <span> { channel.minimumPrice } Per Cycle </span>
      </div>
    )
   
    const items = channels.map((channel,index) => ({
      childKey: index,
      image: '/',
      description: channel.description,
      header: channel.channelName,
      meta: channel.username,
      extra: extra(channel),
      onClick: () => this.toChannel(channel.account),
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
            <Grid.Column width={ 3 }>
              <Button primary fluid>Go</Button>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          { items.length > 0 ? <Item.Group link items={ items } /> : <div> Trouble loading channels! </div> }
        </Segment>
      </AuthedApp>
    )
  }
}

export default Channels