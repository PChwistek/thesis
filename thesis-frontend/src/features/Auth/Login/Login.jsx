import React, { Component } from 'react'
import CreateAccountTiles from '../GetStarted/CreateAccountTiles'
import Navigation from '../../Navigation/Navigation'

import { 
  Container,
  Header,
  Segment,
} from 'semantic-ui-react'

class Login extends Component {

  componentDidMount() {
    const { setScatter } = this.props
    setScatter()
  }
  
  render() {
    const { loginScatter, isFetchingAccount } = this.props

    if(isFetchingAccount) {
      return (
        <Container>
          <Navigation onboarding/>
          <Segment placeholder textAlign="center">
            <Header as="h4" content="Please select an account in Scatter" />
          </Segment>
        </Container>
      )
    }

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