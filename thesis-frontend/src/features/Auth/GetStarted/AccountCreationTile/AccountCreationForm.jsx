import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Button } from 'bloomer'

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
      <form>
        <div>
          {
            identity && 
            <div>
                We will connect your account with this public key: 
              { identity.publicKey }
            </div>
          }
          <label>First Name</label>
          <div>
            <Field
              name="firstname"
              component="input"
              type="text"
              placeholder="First Name"
            />
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <Field
              name="lastname"
              component="input"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div>
          <label>Email</label>
          <div>
            <Field
              name="email"
              component="input"
              type="text"
              placeholder="Email"
            />
          </div>
        </div>
        <div className={ 'continue-button' }>
          <Button isColor='info' isOutlined onClick={ this.handleClick }> Continue </Button>
        </div>
      </form>
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