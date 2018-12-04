import React, { Component } from 'react'
import { 
  Hero, 
  HeroBody, 
  Container,
  Title,
  Button,
} from 'bloomer'


import CreateAccountTiles from './CreateAccountTiles'
import AccountCreationTile from './AccountCreationTile'

class GetStarted extends Component {

  componentDidMount(){
    const { setScatter } = this.props
    setScatter()
  }

  handleEnter = () => {
    this.props.history.push('/dashboard')
  }

  render() {
    const { accountExists, account, identity, unlocked, subs, cart, available, activeIndex, setScatterAccount, getStartedNext, getStartedBack } = this.props
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
      available && !account && setScatterAccount()
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
              <Button isColor='white' isOutlined onClick={ () => this.handleEnter() }> Enter! </Button>
            </div>         
            </Container>
        </HeroBody>
      </Hero>
      { /* accountExists 
          ? <div>
            You got an account
            <ul>
              <li>
                { account.name }
              </li>
              <li>
                { account.blockchain }
              </li>
              <li>
                { account.authority }
              </li>
              <li className={ 'clickable' } onClick={ this.sayHello }>
                Say hello!
              </li>
              <br />
              <h2 className={ 'clickable' } onClick={ this.handleAddToCart }>
                Subscribe to Bob's programming tutorials!
              </h2>
              <br />
              <h2>
                Your subscription cart :
                {
                  cart.map((item) => (
                    <div key={ item.name }>
                      <p>{ item.name }</p>
                      <p> { item.amount } </p> 
                      <br />
                    </div>
                  ))
                }
                <br />
                { cart && <p onClick={ () => this.submitCart(cart) } className={ 'clickable' }> Pay for your subscriptions </p> }
              </h2>
              <h2>
                Your subscriptions: 
                {
                  subs.map((item) => (
                    <div key={ item.name }>
                      <p>{ item.name }</p>
                      <p> { item.amount } </p> 
                    </div>
                  ))
                }
              </h2>
            </ul>
          </div>
          : <div>
            Create an Account
            <br />
            <div onClick={ this.createWithScatter } className={ 'clickable' }> 
              Create an account with Scatter 
            </div>
          </div>
              */} 
    </div>      
    )
  }
}

export default GetStarted