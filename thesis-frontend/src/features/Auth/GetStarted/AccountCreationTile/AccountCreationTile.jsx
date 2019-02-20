import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import AccountCreationForm from './AccountCreationForm'



class AccountCreationTile extends Component {
  render() {
    const { getStartedBack, available, identity } = this.props
    return (
      <Container 
        style={ {
          marginTop: '3em'
        } } 
      >
        {
          !available && !identity
            ? <div>
              Scatter not unlocked. Please unlock scatter and refresh the page. 
            </div>
            : <AccountCreationForm { ...this.props }/>
        }
        <div onClick={ getStartedBack } className={ 'clickable' }> Back </div>
      </Container>
    )
  }
}

export default AccountCreationTile