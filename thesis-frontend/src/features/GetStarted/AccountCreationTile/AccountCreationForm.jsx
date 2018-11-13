import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { get } from 'lodash'

class AccountCreationForm extends Component {
  render(){
    const { account, identity } = this.props
    const personal =  get(identity, 'personal', {})
    console.log(personal)
    return (
      <form>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email"/>
        </div>
        <button type="submit">Submit</button>
    </form>
    )
  }
}


AccountCreationForm = reduxForm({
  form: 'account',
  destroyOnUnmount: false,
})(AccountCreationForm)

export default AccountCreationForm