import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

class PersonalSummary extends Component {
  render() {
    const { first, last, username, bio } = this.props
    return (
      <div>
        <Card
          image=''
          header={ `${first} ${last}` }
          meta={ username }
          description={ bio }
        />
      </div>
    )
  }
}
export default PersonalSummary
