import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Menu } from 'semantic-ui-react'

export default class Header extends Component {
  render() {
    const { login, onboarding } = this.props
    return (
      <Menu secondary>
        <Menu.Item>
          <Link to="/">
            Submerged
          </Link>
        </Menu.Item>
        {
          !onboarding && (
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to="/get-started">
                Sign Up
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/login" onClick={ login }>
                Log In
              </Link>
            </Menu.Item>
          </Menu.Menu>
        )
        }
      </Menu>
    )
  }
}