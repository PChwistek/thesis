import React, { Component } from 'react'

import './GetStarted.css'

class GetStarted extends Component {

  createWithScatter = () => {
    const { setScatter } = this.props
    setScatter()
  }

  render() {
    return (
      <div>
        Create an Account
        <br />
        <div onClick={ this.createWithScatter } className={ 'clickable' }> 
          Create an account with Scatter 
        </div>
      </div>
    )
  }
}

export default GetStarted