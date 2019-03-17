import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Landing from '../Landing'
import Channels from '../Channels'
import GetStarted from '../Auth/GetStarted'
import Login from '../Auth/Login'
import Dashboard from '../Dashboard'
import Profile from '../Profile'
import UserChannel from '../Channels/UserChannel'
/* import PrivateRoute from './PrivateRoute' */



export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Landing } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/logout" component={ Landing } />
        <Route path="/get-started" component={ GetStarted } />
        <Route path="/dashboard" component={ Dashboard } />
        <Route path="/channels" component={ Channels } />
        <Route path="/channel" component={ UserChannel } />
        <Route path="/account" component={ Profile } />
        <Route render={ () => (<div>404</div>) } />
      </Switch>
    )
  }
}