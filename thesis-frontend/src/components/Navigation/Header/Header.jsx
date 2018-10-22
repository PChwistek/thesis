import React, { Component } from 'react'
import { Navbar, NavbarBrand, NavbarItem, Icon } from 'bloomer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class Header extends Component {
  render() {
    return (
      <Navbar>
        <NavbarBrand>
          <NavbarItem>
            Bloomer
          </NavbarItem>
          <NavbarItem>
          <label>
            <FontAwesomeIcon
              icon="github"
            />
            Username
          </label>
          </NavbarItem>
          <NavbarItem>
            <Icon className='fa fa-twitter' style={{ color: '#55acee' }} />
          </NavbarItem>
        </NavbarBrand>
      </Navbar>
    )
  }
}