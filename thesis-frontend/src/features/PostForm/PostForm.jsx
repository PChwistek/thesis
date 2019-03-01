import React, { Component } from 'react'
import { Button, Form, Select } from 'semantic-ui-react'

class PostForm extends Component {
  state = {
    type: 'social'
  }
  getExtraFields = () => {
    const { type } = this.state
    console.log('Type', type)
    if(this.state.type === 'social') {
      return (
        <div>
          yo
        </div>
      )
    } else if (this.state.type === 'declaration') {
      return(
        <div>
          Extra details...
        </div>
      )
    } else if (this.state.type === 'delivery') {
      <div>
        delivery
      </div>
    } else if (this.state.type === 'extension') {
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

  render() {
    const { hasChannel } = this.props
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
          <Form.TextArea name='body' label='Your Post' type="text" placeholder={ 'What\'s going on?' } />
        </Form.Field>
        <Form.Field  
          name='type' 
          control={ Select } 
          label='Post Type' 
          options={ hasChannel ? options: [options[0]] } 
          placeholder='Post Type' 
          defaultValue={ 'social' } 
          onChange={ this.setExtraFields }
        />
        { this.getExtraFields() }
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

export default PostForm