import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Landing from '../Landing'
import GetStarted from '../Auth/GetStarted'
import Dashboard from '../Dashboard'
import PrivateRoute from './PrivateRoute'



export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Landing } />
        <Route path="/get-started" component={ GetStarted } />
        <PrivateRoute path="/dashboard" component={ Dashboard } />
        <Route render={ () => (<div>404</div>) } />
      </Switch>
    )
  }
}