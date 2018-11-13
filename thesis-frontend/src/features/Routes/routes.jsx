import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Landing from '../Landing'
import GetStarted from '../GetStarted'

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Landing } />
        <Route path="/get-started" component={ GetStarted } />
        <Route render={ () => (<div>404</div>) } />
      </Switch>
    )
  }
}