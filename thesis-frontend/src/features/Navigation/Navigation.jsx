import React, { Component } from 'react'

import Header from '../../components/Navigation/Header'
import HeaderAuthed from '../../components/Navigation/HeaderAuthed'

class Navigation extends Component {
  render() {
    const { account, token, logout, loginScatter } = this.props 
    return (
      <div>
        {
          token 
            ? <HeaderAuthed logout={ logout } account={ account } />
            : <Header login={ loginScatter } />
        }
      </div>
    )
  }
}

export default Navigation