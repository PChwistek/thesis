import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

//import s from './HeaderAuthed.scss'

export default class HeaderAuthed extends Component {
  render() {
    const { logout } = this.props
    return (
      <Menu secondary>
        <Menu.Item>
          <Link to="/">
            Submerged
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </Menu.Item>
         
          <Menu.Item>
            <Link to="/dashboard">
              Channels
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/dashboard">
              Your Channel
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/dashboard">
              Your Profile
            </Link>
          </Menu.Item>
          <Menu.Item onClick={ logout }>
            <Link to="/">
              Logout
            </Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

