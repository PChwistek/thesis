import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import '../App.css';

class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        <LoadingBar />
        <div>
          {this.props.authed === true
            ? <div> Please launch MetaMask. </div>
            : <div> Works correctly! </div>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps({authedUser}) {
  return {
    authed: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
