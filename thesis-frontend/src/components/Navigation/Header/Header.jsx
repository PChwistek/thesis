import React, { Component } from 'react'
import { Navbar, NavbarBrand, NavbarItem } from 'bloomer'
import { Link } from 'react-router-dom'

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
      </Navbar>
    )
  }
}