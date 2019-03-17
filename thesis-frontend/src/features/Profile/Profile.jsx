import React, { Component } from 'react'
import AuthedApp from '../AuthedApp'
import { Button } from 'semantic-ui-react'


class Profile extends Component {

  componentDidMount() {
    const { isScatterAccount, setScatter } = this.props
    if (!isScatterAccount) {
      setScatter()
    }
  }

  render() {
    const { sayHello } = this.props

    return (
      <AuthedApp>
        This is the Profile Page
        <br />
        <Button primary onClick={ sayHello }> Say Hello </Button> 
      </AuthedApp>
    )
  }

}

export default Profile