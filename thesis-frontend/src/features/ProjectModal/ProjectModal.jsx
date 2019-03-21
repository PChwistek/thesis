import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Embed } from 'semantic-ui-react'
import { getEmbedId } from '../../helpers/utils'

class ProjectModal extends Component {

  render() {
    const { open, close, post } = this.props
    return (
      <Modal open={ open } onClose={ close }>
        <Modal.Header>{ post.project_name } </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            { !post.fulfilled && `${post.time_due}` }
            <Header>Status: { post.status } </Header>
            <p> Satisfied: { post.agree } </p>
            <p> Dissatisfied: { post.disagree } </p>
          </Modal.Description>
          { 
            post.content_link 
              ? <Embed id={ getEmbedId(post.content_link) } placeholder='' source='youtube' active autoplay={ false } /> 
              : <div> Content type: { post.content_type } </div>
          }
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Proceed <Icon name='right chevron' />
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ProjectModal