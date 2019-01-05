import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { 
  Navbar, 
  NavbarBrand, 
  NavbarEnd, 
  NavbarItem 
} from 'bloomer'

import s from './HeaderAuthed.scss'

export default class HeaderAuthed extends Component {
  render() {
    const { logout } = this.props
    return (
      <Navbar className={ s.header }>
        <NavbarBrand>
          <NavbarItem>
            <Link to="/">
              Thesis
            </Link>
          </NavbarItem>
        </NavbarBrand>
        <NavbarEnd>
          <NavbarItem>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/get-started">
              Your Subscriptions
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/">
              Your Profile
            </Link>
          </NavbarItem>
          <NavbarItem onClick={ logout }>
            <Link to="/">
              Logout
            </Link>
          </NavbarItem>
        </NavbarEnd>
      </Navbar>
    )
  }
}

