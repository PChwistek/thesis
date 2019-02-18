import React from 'react'
import { Button, Form, Select } from 'semantic-ui-react'
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
const PostForm = () => (
  <Form>
    <Form.Field>
      <Form.TextArea label='Your Post' placeholder={ 'What\'s going on?' } />
    </Form.Field>
    <Form.Field>
      <Form.Field control={ Select } label='Post Type' options={ options } placeholder='Post Type' />
    </Form.Field>

    <Button type='submit'>Submit</Button>
  </Form>
)

export default PostForm