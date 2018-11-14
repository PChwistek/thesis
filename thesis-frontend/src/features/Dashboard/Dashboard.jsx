import React, { Component } from 'react'
import {
  Hero,
  Container
} from 'bloomer'

class Dashboard extends Component {
  render() {
    return (
      <Hero isColor='info' isSize='medium' isFullHeight>
          <Container hasTextAlign='centered'>
            <div>
              This is the dashboard!
            </div>
          </Container>
      </Hero>
    )
  }
}

export default Dashboard