import React, { Component } from 'react'
import { 
  Hero, 
  HeroBody, 
  Container,
  Title,
} from 'bloomer'

import s from './GetStarted.scss'
import CreateAccountTiles from './CreateAccountTiles'

class GetStarted extends Component {

  createWithScatter = () => {
    const { setScatterAccount } = this.props
    setScatterAccount()
  }

  sayHello = () => {
    const { sayHello } = this.props
    sayHello()
  }

  submitCart = cart => {
    const { transferMoney } = this.props
    cart.map(account => transferMoney(account))
  }

  handleAddToCart = () => {
    const { addSubscriptionToCart } = this.props
    addSubscriptionToCart( {name: 'bobmanager', amount: '1.000 SYS'}  )
  }

  componentDidMount(){
    const { setScatter } = this.props
    setScatter()
  }

  render() {
    const { accountExists, account, subs, cart } = this.props
    return (
      <div>
        <Hero isColor='info' isSize='medium' isFullHeight>
          <HeroBody>
            <Container hasTextAlign='centered'>
              <Title> Create an Account</Title>
              <CreateAccountTiles />
            </Container>
          </HeroBody>
        </Hero>

        { accountExists 
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
        }
      </div>
    )
  }
}

export default GetStarted