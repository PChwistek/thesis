import React, { Component } from 'react'
import { values } from 'lodash'
import './Dashboard.scss'
import {
  Button,
  Column,
  Columns,
  Container,
  Control,
  Field,
  Hero,
  Input,
  Label,
  Notification,
} from 'bloomer'

class Dashboard extends Component {
  componentDidUpdate() {
    const { isScatterSet, isScatterAccount, setScatter, setScatterAccount } = this.props
    if(!isScatterSet) {
      setScatter()
    } else if (!isScatterAccount) {
      setScatterAccount()
    } 
  }
  sayHello = () => {
    const { sayHello } = this.props
    sayHello()
  }

  subscribe = cart => {
    const { transferMoney } = this.props
    cart.map(account => transferMoney(account))
  }

  openStore = () => {
    const { openStore } = this.props
    openStore('1.0000')
  }

  componentDidMount() {
    const { authCompleted, getStores } = this.props
    authCompleted()
    getStores()
  }

  render() {
    const { stores, subscribe } = this.props
    return (
      <Hero isColor='info' isSize='medium' isFullHeight>
        <Container hasTextAlign='centered'>
          <Columns isCentered className={ 'dashboard-columns' }>
            <Column isSize='1/3'>
              <Notification isColor='white' hasTextAlign='centered'> 
                Open your own store?  
                <div className={ 'break' }/>
                <Field>
                  <Label> Minimum subscription price </Label>
                  <Control>
                    <Input type="text" placeholder='1.0000 SYS' />
                  </Control>
                </Field>
                <Button isColor='primary' onClick={ this.openStore }>Open</Button>
              </Notification>
            </Column>
            <Column isSize='2/3'>
              <Notification isColor='white' hasTextAlign='centered'> 
                Content Creators
                <div className={ 'break' }/>
                <div className={ 'clickable' }>
                  { 
                    values(stores).map(store => (
                      <div key={ store.key } onClick={ () => subscribe(store.key, store.minimum_price) }>
                        { store.key + ', ' }
                        
                        { store.minimum_price }
                      </div>
                    )) 
                  }
                </div> 
                <div className={ 'break' } />
                <Button isColor='primary' onClick={ this.sayHello }> Say Hello </Button> 
              </Notification>
            </Column>
          </Columns>
        </Container>
      </Hero>
    )
  }
}

export default Dashboard