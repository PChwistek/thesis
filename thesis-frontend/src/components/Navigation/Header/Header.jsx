import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { 
  Navbar, 
  NavbarBrand, 
  NavbarItem, 
  NavbarEnd 
} from 'bloomer'


import s from './Header'

export default class Header extends Component {
  render() {
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
            <Link to="/get-started">
              Sign Up
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/">
              Log In
            </Link>
          </NavbarItem>
        </NavbarEnd>
      </Navbar>
    )
  }
}