import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  
  render() {
    return (
      <Fragment>
        <div id='dashboard' className='has-text-centered'>
          <span className='title'>
            Welcome!
          </span>
          <br />
          <span className='subtitle'>
            You are currently accessing this site with this wallet address:
            <br />
            {this.props.authedUser}
          </span>
        </div>
        <div className='hero-body has-text-centered'>
          Click the button below to start a subscription contract!
          <br />
          (This will cost some ether... approximately $0.04)
          <br />
          <button className='button'>
            Start a subscription contract!
          </button>
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(Dashboard)