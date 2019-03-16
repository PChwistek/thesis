import React, { Component } from 'react'
import { Dropdown, Grid, Item, Input, Segment } from 'semantic-ui-react'
import AuthedApp from '../../components/AuthedApp'

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