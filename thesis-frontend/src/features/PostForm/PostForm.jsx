import React, { Component } from 'react'
import { Button, Dropdown, Embed, Form, Input, Select } from 'semantic-ui-react'

class PostForm extends Component {
  state = {
    type: 'social',
    body: '',

  }
  getExtraFields = () => {
    const { type } = this.state
    const optionTypes = [ 
      { key: 'video', value: 'video', text: 'Video' },
      { key: 'podcast', value: 'podcast', text: 'Podcast ' }
    ]
    if (type === 'declaration') {
      return(
        <div>
          <Input placeholder='Project title' />
          <Input placeholder='MM/DD' />
          <Dropdown placeholder='Content type' search selection options={ optionTypes } />
        </div>
      )
    } else if (type === 'delivery') {
      return (
        <div>
          <Input fluid placeholder='link' />
          <Embed id='O6Xo21L0ybE' placeholder='/images/image-16by9.png' source='youtube' />
        </div>
      )
    } else if (type === 'extension') {
      <div>
        extension
      </div>
    }
  }

  setExtraFields = (event, data) => {
    this.setState({
      type: data.value,
    })
  }

  setPost = (event, data) => {
    this.setState({
      body: data.value,
    })
  }

  render() {
    const { hasChannel, post } = this.props
    const options = [
      {
        text: 'Social',
        value: 'social'
      },
      {
        text: 'Declaration',
        value: 'declaration'
      },
      {
        text: 'Delivery',
        value: 'delivery'
      },
      {
        text: 'Extension',
        value: 'extension'
      }
    ]
    return (
      <Form>
        <Form.Field>
          <Form.TextArea name='body' label='Your Post' type="text" placeholder={ 'What\'s going on?' } onChange={ this.setPost } />
        </Form.Field>
        <Form.Field  
          name='type' 
          control={ Select } 
          label='Post Type' 
          options={ hasChannel ? options : [options[0]] } 
          placeholder='Post Type' 
          defaultValue={ 'social' } 
          onChange={ this.setExtraFields }
        />
        { this.getExtraFields() }
        <Button type='submit' onClick={ () => post({ type: this.state.type, body: this.state.body }) }>Submit</Button>
      </Form>
    )
  }
}

export default PostForm