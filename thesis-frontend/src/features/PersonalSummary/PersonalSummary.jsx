import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'

class PersonalSummary extends Component {
  render() {
    const { first, last, username, bio, subs, account, getSubscribers } = this.props
    getSubscribers(account)
    const extra = ( 
      <a>
        <Icon name='user' />
        { subs } Subscribers
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
