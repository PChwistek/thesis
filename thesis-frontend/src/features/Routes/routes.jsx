import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Landing from '../Landing'
import Channels from '../Channels'
import GetStarted from '../Auth/GetStarted'
import Dashboard from '../Dashboard'
import Profile from '../Profile'
import UserChannel from '../UserChannel'
/* import PrivateRoute from './PrivateRoute' */



export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Landing } />
        <Route path="/get-started" component={ GetStarted } />
        <Route path="/dashboard" component={ Dashboard } />
        <Route path="/channels" component={ Channels } />
        <Route path="/channel" component={ UserChannel } />
        <Route path="/profile" component={ Profile } />
        <Route render={ () => (<div>404</div>) } />
      </Switch>
    )
  }
}