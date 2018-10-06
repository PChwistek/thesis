import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div>
        This is the home page!
        <br />
        <Link to="/get-started">
          Get started!
        </Link>
      </div>
    )
  }
}

export default App


