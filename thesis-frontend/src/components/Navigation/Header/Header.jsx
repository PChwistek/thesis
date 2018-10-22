import React, { Component } from 'react'
import { Navbar, NavbarBrand, NavbarItem } from 'bloomer'

import s from './Header'

export default class Header extends Component {
  render() {
    return (
      <Navbar className={ s.header }>
        <NavbarBrand>
          <NavbarItem>
            Thesis
          </NavbarItem>
        </NavbarBrand>
      </Navbar>
    )
  }
}