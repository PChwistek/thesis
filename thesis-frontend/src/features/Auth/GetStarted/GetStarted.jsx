import React, { Component } from 'react'
import AccountCreationTile from './AccountCreationTile'
import CreateAccountTiles from './CreateAccountTiles'
import { 
  Button, 
  Container, 
  Hero,
  HeroBody,
  Title,
} from 'bloomer'

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
        <div>
          <Hero isColor='info' isSize='medium' isFullHeight>
            <HeroBody>
              <Container hasTextAlign='centered'>
                <Title> Create an Account</Title>
                <CreateAccountTiles getStartedNext={ getStartedNext } />
              </Container>
            </HeroBody>
          </Hero>
        </div>
      )
    } else if (activeIndex === 1){
      available && !identity && setScatterAccount()
      return (
        <div>
          <Hero isColor='info' isSize='medium' isFullHeight>
            <HeroBody>
              <Container hasTextAlign='centered'>
                <AccountCreationTile 
                  isScatter 
                  { ...this.props }
                />
              </Container>
            </HeroBody>
          </Hero>
        </div>
      )
    }
    return (
      <div>
        <Hero isColor='info' isSize='medium' isFullHeight>
          <HeroBody>
            <Container hasTextAlign='centered'>
              <div> You're all set! </div>
              <div className={ 'continue-button' }>
                <Button isColor='white' isOutlined onClick={ this.handleEnter }> Enter! </Button>
              </div>         
            </Container>
          </HeroBody>
        </Hero>
      </div>      
    )
  }
}

export default GetStarted