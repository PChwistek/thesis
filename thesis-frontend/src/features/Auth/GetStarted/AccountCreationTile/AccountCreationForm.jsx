import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Button } from 'bloomer'

import './AccountCreationTile.scss'

let AccountCreationForm = props => {
  return (
    <form>
      <div>
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
      <Button isColor='info' isOutlined onClick={ props.getStartedNext }> Continue </Button>
    </div>
  </form>
  )
}


AccountCreationForm = reduxForm({
  form: 'account',
  destroyOnUnmount: false,
  enableReinitialize: true,
})(AccountCreationForm)

AccountCreationForm = connect(
  state => ({
    initialValues: get(state, 'scatter.ref.identity.personal', {}) // pull initial values from state
  }),
)(AccountCreationForm)

export default AccountCreationForm