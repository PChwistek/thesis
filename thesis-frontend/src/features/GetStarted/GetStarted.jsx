import React, { Component } from 'react'

import './GetStarted.css'

class GetStarted extends Component {

  createWithScatter = () => {
    const { setScatterAccount } = this.props
    setScatterAccount()
  }

  sayHello = () => {
    const { sayHello } = this.props
    sayHello()
  }

  componentDidMount(){
    const { setScatter } = this.props
    setScatter()
  }

  render() {
    const { accountExists, account } = this.props
    return (
      <div>
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