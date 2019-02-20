import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Button, Form } from 'semantic-ui-react'

import './AccountCreationTile.scss'

class AccountCreationForm extends Component {
  handleClick = () => {
    const { getStartedNext, createScatterAssocAccount } = this.props
    createScatterAssocAccount()
    getStartedNext()
  }
  render() {
    const { identity } = this.props
    return (
      <Form>
        <div>
          {
            identity && 
            <div>
                We will connect your account with this public key: 
              { identity.publicKey }
            </div>
          }
          <Form.Field>
            <label>First Name</label>
            <Field
              name="firstname"
              component="input"
              type="text"
              placeholder="First Name"
            />
          </Form.Field>
        </div>
        <Form.Field>
          <label>Last Name</label>
          <Field
            name="lastname"
            component="input"
            type="text"
            placeholder="Last Name"
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <Field
            name="email"
            component="input"
            type="text"
            placeholder="Email"
          />
        </Form.Field>
        <div className={ 'continue-button' }>
          <Button isColor='info' isOutlined onClick={ this.handleClick }> Continue </Button>
        </div>
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