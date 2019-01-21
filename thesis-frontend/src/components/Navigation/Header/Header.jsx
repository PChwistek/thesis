import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Menu } from 'semantic-ui-react'

export default class Header extends Component {
  render() {
    const { login } = this.props
    return (
      <Menu secondary>
        <Menu.Item>
          <Link to="/">
            Submerged
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/get-started">
              Sign Up
            </Link>
          </Menu.Item>
          <Menu.Item>
            <div onClick={ login }>
              Log In
            </div>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}