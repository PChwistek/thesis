import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Button, Form, Header, Segment, Input } from 'semantic-ui-react'

import './AccountCreationTile.scss'

class AccountCreationForm extends Component {
  handleClick = () => {
    const { getStartedNext, createScatterAssocAccount } = this.props
    createScatterAssocAccount()
    getStartedNext()
  }
  render() {
    const { identity: { accounts } } = this.props
    const fieldStyle = {
      minWidth: '50%',
    }
    return (
      <Form>
        <Segment placeholder textAlign="center">
          {
            accounts && 
            <Header as="h4">
                We will connect your Submerged profile with this EOS account:  { accounts[0].name }
            </Header>
          }
          <Form.Field style={ fieldStyle }>
            <label>First Name</label>
            <Field
              name="firstname"
              type="text"
              placeholder="First Name"
              component={ Input }
            />
          </Form.Field>
          <Form.Field style={ fieldStyle }>
            <label>Last Name</label>
            <Field
              name="lastname"
              component={ Input }
              type="text"
              placeholder="Last Name"
            />
          </Form.Field>
          <Form.Field style={ fieldStyle }>
            <label>Email</label>
            <Field
              name="email"
              component={ Input }
              type="text"
              placeholder="Email"
            />
          </Form.Field>
          <div className={ 'continue-button' }>
            <Button.Group>
              <Button secondary onClick={ this.props.getStartedBack }> Back </Button>
              <Button primary onClick={ this.handleClick }> Continue </Button>
            </Button.Group>
          </div>
        </Segment>
      </Form>
    )
  }
}


const theform = reduxForm({
  form: 'account',
  destroyOnUnmount: false,
  enableReinitialize: true,
})(AccountCreationForm)

const ConnectedAccountCreationForm = connect(
  state => ({
    initialValues: get(state, 'scatter.ref.identity.personal', {}) // pull initial values from state
  }),
)(theform)

export default ConnectedAccountCreationForm