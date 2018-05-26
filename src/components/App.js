import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchWeb3Data } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import MetaMaskError from './MetaMaskError'
import Dashboard from './Dashboard.js'
import 'bulma/css/bulma.min.css'
import '../css/app.css'

class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(fetchWeb3Data())
  }

  render() {
    return (
      <div className='hero'>
        <LoadingBar />
        <div className='container'>
          {this.props.authed === true
            ? <MetaMaskError />
            : <Dashboard />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authed: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
