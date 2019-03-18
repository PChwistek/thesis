import React, { Component } from 'react'
import { Button, Dropdown, Embed, Form, Input, Select } from 'semantic-ui-react'
import { Field, reduxForm, change } from 'redux-form'
import { getEmbedId } from '../../helpers/utils' 

class PostForm extends Component {

  componentDidMount(){
    const { setScatter, isScatterAccount } = this.props
    if(!isScatterAccount) {
      setScatter()
    }
  }

  handlePost = () => {
    const { thePostForm, post, declareProject, deliverProject } = this.props
    switch(thePostForm.type) {
      case 'declaration':
        return declareProject(thePostForm)
      case 'delivery':
        return deliverProject(thePostForm)
      case 'extension':
        return post(thePostForm)
      default: 
        return post(thePostForm)
    }
  }

  getExtraFields = () => {
    const { thePostForm, projects, getProjects } = this.props
    getProjects()
    const optionTypes = [ 
      { key: 'video', value: 'video', text: 'Video' },
      { key: 'podcast', value: 'podcast', text: 'Podcast ' }
    ]
    
    switch(thePostForm.type) {
      case 'declaration':
        return(
          <div>
            <Form.Field>
              <Field
                component={ Input }
                placeholder="Project Title"
                name="title"
              />
            </Form.Field>
            <Form.Group>
              <Form.Field>
                <Field
                  component={ Input }
                  placeholder="MM/DD"
                  name="dueDate"
                />
              </Form.Field>
              <Form.Field>
                <Dropdown placeholder='Content type' search selection options={ optionTypes } onChange={ this.handleContentType } />
              </Form.Field>
            </Form.Group>
          </div>
        )
      case 'delivery':
        const activeProjects = projects.filter(project => project.active).map(project => ({ key: project.title, value: project.title, text: project.title }))
        return (
          <div>
            <Form.Field>
              <Dropdown name="title" placeholder='Which project?' search selection options={ activeProjects } onChange={ this.handleWhichProject } />
            </Form.Field>
            <Form.Field>
              <Field component={ Input } name="link" placeholder="Delivery link" fluid />
            </Form.Field>
            <Form.Field>
              <Embed id={ getEmbedId(thePostForm.link) } placeholder='' source='youtube' active autoplay={ false } />
            </Form.Field>
            <br />
          </div>
        )
      case 'extension':
        return (
          <div>
            extension
          </div>
        )
    }
  }

  handleSelect = (event, data) => {
    this.props.dispatch(change('post', 'type', data.value))
  }

  handleContentType = (event, data) => {
    this.props.dispatch(change('post', 'contentType', data.value))
  }

  handleWhichProject = (event, data) => {
    this.props.dispatch(change('post', 'title', data.value))
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
          <Field
            name="body"
            type="text"
            placeholder="What's going on?"
            component="textarea"
          />
        </Form.Field>
        <Form.Field>
          <Select options={ hasChannel ? options : [options[0]] } defaultValue={ 'social' } onChange={ this.handleSelect } />
        </Form.Field>
        { this.getExtraFields() }
        <Button 
          type='submit' 
          onClick={ this.handlePost }
        >
          Submit
        </Button>
      </Form>
    )
  }
}

const theForm = reduxForm({
  form: 'post',
  destroyOnUnmount: true,
  enableReinitialize: true,
})(PostForm)

export default theForm