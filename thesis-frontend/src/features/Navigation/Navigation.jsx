import React, { Component } from 'react'

import Header from '../../components/Navigation/Header'
import HeaderAuthed from '../../components/Navigation/HeaderAuthed'

class Navigation extends Component {
  render() {
    const { completed } = this.props 
    return (
      <div>
        {
          completed 
            ? <HeaderAuthed />
            : <Header />
        }
      </div>
    )
  }
}

export default Navigation