import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'

class PersonalSummary extends Component {
  render() {
    const { first, last, username, bio, subs } = this.props
    const extra = ( 
      <a>
        <Icon name='user' />
        { subs } Subscribed
      </a>
    )
    return (
      <div>
        <Card
          image=''
          header={ `${first} ${last}` }
          meta={ username }
          description={ bio }
          extra={ extra }
        />
      </div>
    )
  }
}
export default PersonalSummary
