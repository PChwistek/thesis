import React, { Component } from 'react'
import { Dropdown, Grid, Input, Segment } from 'semantic-ui-react'
import AuthedApp from '../../components/AuthedApp'

class Channels extends Component {
  render() {
    const options = [
      { key: 'angular', text: 'Angular', value: 'angular' },
      { key: 'css', text: 'CSS', value: 'css' },
      { key: 'design', text: 'Graphic Design', value: 'design' },
      { key: 'ember', text: 'Ember', value: 'ember' },
      { key: 'html', text: 'HTML', value: 'html' },
      { key: 'ia', text: 'Information Architecture', value: 'ia' },
      { key: 'javascript', text: 'Javascript', value: 'javascript' },
      { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
      { key: 'meteor', text: 'Meteor', value: 'meteor' },
      { key: 'node', text: 'NodeJS', value: 'node' },
      { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
      { key: 'python', text: 'Python', value: 'python' },
      { key: 'rails', text: 'Rails', value: 'rails' },
      { key: 'react', text: 'React', value: 'react' },
      { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
      { key: 'ruby', text: 'Ruby', value: 'ruby' },
      { key: 'ui', text: 'UI Design', value: 'ui' },
      { key: 'ux', text: 'User Experience', value: 'ux' },
    ]
    return (
      <AuthedApp>
        <Segment>
          <Grid columns="equal" relaxed="very">
            <Grid.Column width={ 6 }>
              <Input fluid placeholder="Search..." />
            </Grid.Column>
            <Grid.Column>
              <Dropdown placeholder='Tags' fluid multiple selection options={ options } />
            </Grid.Column>
          </Grid>
        </Segment>
      </AuthedApp>
    )
  }
}

export default Channels