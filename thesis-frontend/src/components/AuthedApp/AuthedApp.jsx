
import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Navigation from '../Navigation/HeaderAuthed'

class AuthedApp extends Component {
  render() {
    return (
      <Container>
        <Navigation />
        {
          this.props.children
        }
      </Container>
    )
  }
}

export default AuthedApp