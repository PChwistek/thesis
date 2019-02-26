import React, { Component } from 'react'
import AccountCreationTile from './AccountCreationTile'
import CreateAccountTiles from './CreateAccountTiles'


import { 
  Button,
  Container,
  Header 
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
    const { identity, available, activeIndex, setScatterAccount, getStartedNext } = this.props
    if(activeIndex === 0) {
      return (
        <Container>
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
      available && !identity && setScatterAccount()
      return (
        <div>
          <Container>
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
        <div> You're all set! </div>
        <div className={ 'continue-button' }>
          <Button onClick={ this.handleEnter }> Enter! </Button>
        </div>         
      </Container>
    )
  }
}

export default GetStarted