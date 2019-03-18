import React, { Component } from 'react'
import AccountCreationTile from './AccountCreationTile'
import CreateAccountTiles from './CreateAccountTiles'
import Navigation from '../../../components/Navigation/Header'

import { 
  Button,
  Container,
  Header,
  Segment 
} from 'semantic-ui-react'

class GetStarted extends Component {

  componentDidMount(){
    const { setScatter } = this.props
    setScatter()
  }

  handleEnter = () => {
    this.props.history.push('/dashboard')
  }

  render() {
    const { identity, available, activeIndex, setScatterAccount, getStartedNext, isFetchingAccount } = this.props
    if(activeIndex === 0) {
      return (
        <Container>
          <Navigation onboarding />
          <Header as="h3"
            content='Create an account'
            style={ {
              fontSize: '4em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: '3em'
            } } 
          />
          <CreateAccountTiles getStartedNext={ getStartedNext } />
        </Container>
      )
    } else if (activeIndex === 1){
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
      available && !identity && setScatterAccount()
      return (
        <div>
          <Container>
            <Navigation onboarding />
            <AccountCreationTile 
              isScatter 
              { ...this.props }
            />
          </Container>
        </div>
      )
    }
    return (
      <Container>
        <Navigation onboarding />
        <Segment placeholder textAlign="center">
          <Header as="h4"> Welcome! If you're new, you may want to take a look at this <a> tutorial.</a> </Header>
          <div className={ 'continue-button' }>
            <Button primary onClick={ this.handleEnter }> Enter! </Button>
          </div>         
        </Segment>
      </Container>
    )
  }
}

export default GetStarted