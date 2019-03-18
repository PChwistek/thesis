import React, { Component } from 'react'
import {Modal, Header } from 'semantic-ui-react'

class ScatterModal extends Component {
  render() {
    const { open } = this.props
    return (
      <Modal open={ open } basic size='small'>
        <Header content='Confirm in Scatter... ' />
        <Modal.Content>
          <p>
            Awaiting confirmation in Scatter... 
          </p>
        </Modal.Content>
      </Modal>
    )
  }
}

export default ScatterModal