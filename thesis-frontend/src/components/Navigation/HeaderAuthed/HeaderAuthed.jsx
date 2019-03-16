import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

//import s from './HeaderAuthed.scss'

export default class HeaderAuthed extends Component {
  render() {
    const { logout, account } = this.props
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
            <Link to="/channels">
              Channels
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={
              {
                pathname: '/channel',
                state: {
                  key: account,
                }
              }
            }
            >
              Your Channel
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/account">
              Account
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/logout" onClick={ logout }>
              Logout
            </Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

