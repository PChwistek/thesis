import React, { Component } from 'react'
import CreateAccountTiles from '../GetStarted/CreateAccountTiles'
import Navigation from '../../Navigation/Navigation'

import { 
  Container,
  Header,
} from 'semantic-ui-react'

class Login extends Component {

  componentDidMount() {
    const { setScatter } = this.props
    setScatter()
  }
  
  render() {
    const { loginScatter } = this.props
    return (
      <Container>
        <Navigation onboarding />
        <Header as="h3"
          content='Login'
          style={ {
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '3em'
          } } 
        />
        <CreateAccountTiles getStartedNext={ loginScatter } />
      </Container>
    )
  }
}

export default Login