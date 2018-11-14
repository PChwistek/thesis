import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { 
  Hero, 
  HeroBody, 
  Container, 
  Title,
  Button, 
} from 'bloomer'

class App extends Component {

  render() {
    return (
      <Hero isColor='info' isSize='medium' isFullHeight>
        <HeroBody>
          <Container hasTextAlign='centered'>
            <Title>
              Harness the power of EOS.
            </Title>
            <Link to="/get-started">
              <Button> Get Started. </Button>
            </Link>
          </Container>
        </HeroBody>
      </Hero>
    )
  }
}

export default App


