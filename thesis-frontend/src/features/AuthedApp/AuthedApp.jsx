
import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Navigation from '../Navigation'
import ScatterModal from '../Scatter/ScatterModal'

class AuthedApp extends Component {
  render() {
    const { showScatterModal  } = this.props
    return (
      <Container>
        <Navigation />
        <ScatterModal open={ showScatterModal } />
        {
          this.props.children
        }
      </Container>
    )
  }
}

export default AuthedApp