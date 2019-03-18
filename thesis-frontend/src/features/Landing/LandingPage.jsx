import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Header, Container, Button, Segment, Grid, Image } from 'semantic-ui-react'
import Navigation from '../../components/Navigation/Header'

class App extends Component {

  render() {
    return (
      <div>
        <Segment
          inverted
          textAlign='center'
          style={ { minHeight: 700, padding: '1em 0em' } }
          vertical
        >
          <Container>
            <Navigation />
            <Container text>
              <Header
                as='h1'
                content='Submerged'
                inverted
                style={ {
                  fontSize: '4em',
                  fontWeight: 'normal',
                  marginBottom: 0,
                  marginTop: '3em',
                } }
              />
            </Container>
            <Link to="/get-started">
              <Button inverted> Get Started. </Button>
            </Link>
          </Container>
        </Segment>
        <Segment style={ { padding: '8em 0em' } } vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={ 8 }>
                <Header as='h3' style={ { fontSize: '2em' } }>
                  We Help Companies and Companions
                </Header>
                <p style={ { fontSize: '1.33em' } }>
                  We can give your company superpowers to do things that they never thought possible.
                  Let us delight your customers and empower your needs... through pure data analytics.
                </p>
                <Header as='h3' style={ { fontSize: '2em' } }>
                  We Make Bananas That Can Dance
                </Header>
                <p style={ { fontSize: '1.33em' } }>
                  Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                  bioengineered.
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={ 6 }>
                <Image bordered rounded size='large' src='/images/wireframe/white-image.png' />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Button size='huge'>Check Them Out</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default App


