import React, { Component } from 'react'
import { Button, Dropdown, Form, Input, Header, Segment, TextArea } from 'semantic-ui-react'
import { options } from '../../ChannelTags'


class CreateChannel extends Component {
  state = {
    name: '',
    desc: '',
    tags: [],
    price: '',
    index: 0,
  }

  handleOpen() {
    const { openChannel } = this.props
    openChannel(this.state)
  }

  inputPrice = e => {
    this.setState({
      price: e.target.value,
    })
  }

  inputTags = (e, { value } ) => {
    this.setState({
      tags: value,
    })
  }

  inputDesc = e => {
    this.setState({
      desc: e.target.value,
    })
  }

  inputName = e => {
    this.setState({
      name: e.target.value,
    })
  }

  next(index) {
    this.setState({
      index: index + 1,
    })
  }

  previous(index) {
    this.setState({
      index: index - 1,
    })
  }

  buttons = (index) => (
    <Button.Group>
      <Button secondary onClick={ () => this.previous(index) }> Back </Button>
      <Button primary onClick={ () => this.next(index) }> Next </Button>
    </Button.Group>
  )
    
  nextStep() {
    const { index } = this.state
    const inputStyle = { maxWidth: '50%', margin: 'auto' }

    switch(index) {
      case 0:
        return (
          <div>
            <Header icon>
              You don't have a channel. Would you like to create one?
            </Header>
            <Button primary onClick={ () => this.next(index) }> Yes </Button>
          </div>
        )
      case 1:
        return (
          <div>
            <Header icon>
              Give your channel a name.
            </Header>
            <br />
            <Input
              placeholder='Channel name'
              fluid
              value={ this.state.name }
              onChange={ this.inputName }
              style={ { maxWidth: '25%', margin: 'auto' } }
            />
            <br />
            <br />
            { this.buttons(index) }
          </div>
        )
      case 2: 
        return (
          <div>
            <Header icon>
              Describe it.
            </Header>
            <br />
            <div style={ { maxWidth: '100%' } }>
              <TextArea placeholder='Channel description' style={ inputStyle } onChange={ this.inputDesc } value={ this.state.desc }/>
            </div>
            <br />
            <br />
            { this.buttons(index) }
          </div>
        )
      case 3:
        return (
          <div>
            <Header icon>
              Tag some categories to make it easier to find for audiences.
            </Header>
            <br />
            <Dropdown placeholder='Tags' fluid multiple selection options={ options } style={ inputStyle } onChange={ this.inputTags } value={ this.state.tags } />
            <br />
            <br />
            { this.buttons(index) }
          </div>
        )
      case 4:
        return (
          <div>
            <Header icon>
              How much will you charge monthly?
            </Header>
            <br />
            <Input
              label={ { basic: true, content: 'EOS' } }
              labelPosition='right'
              placeholder='1.0000'
              onChange={ this.inputPrice }
              value={ this.state.price }
              style={ { maxWidth: '25%', margin: 'auto' } }
              fluid
            />
            <br />
            <br />
            { this.buttons(index) }
          </div>
        )
      case 5:
        return (
          <div>
            <Header icon>
              Summary
            </Header>
            <div style={ inputStyle }>
              <Segment vertical textAlign="left"><b>Name:</b> { this.state.name } </Segment>
              <Segment vertical textAlign="left"><b>Description: </b> { this.state.desc } </Segment>
              <Segment vertical textAlign="left"><b>Tags: </b> { 
                this.state.tags.map((tag, index) => <span key={ index }> { index !== 0 ? `, ${tag}`: `${tag}` } </span> )} 
              </Segment>
              <Segment vertical textAlign="left"><b>Price: </b> { this.state.price } EOS </Segment>
            </div>
            <br />
            <Button.Group>
              <Button secondary onClick={ () => this.previous(index) }> Back </Button>
              <Button primary onClick={ () => this.handleOpen() }> Submit </Button>
            </Button.Group>
          </div>
        )
    }
  }
  
  componentDidMount() {
    const { isScatterAccount, setScatter } = this.props
    if (!isScatterAccount) {
      setScatter()
    }
  }

  render() {
    return (
      <Form style={ { paddingTop: '5%' } }>
        <Segment placeholder textAlign="center" >
          {
            this.nextStep()
          }
        </Segment>
      </Form>
    )
  }

}

export default CreateChannel