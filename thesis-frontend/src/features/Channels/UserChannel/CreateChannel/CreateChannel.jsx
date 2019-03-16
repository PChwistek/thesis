import React, { Component } from 'react'
import { Button, Container, Input, Header } from 'semantic-ui-react'
import AuthedApp from '../../../../components/AuthedApp'

class CreateChannel extends Component {
  state = {
    showSetPrice: false,
    price: 0,
    limit: 0,
  }

  handleOpen() {
    const { openChannel } = this.props
    const { price, limit } = this.state
    openChannel(limit, price)
  }

  inputPrice = e => {
    this.setState({
      price: e.target.value,
    })
  }

  inputLimit = e => {
    this.setState({
      limit: e.target.value,
    })
  }
  
  componentDidMount() {
    const { isScatterAccount, setScatter } = this.props
    if (!isScatterAccount) {
      setScatter()
    }
  }

  render() {
    return (
      <AuthedApp>
        <Container>
          {
            this.state.showSetPrice 
              ? <div>
                <Header 
                  as="h4"
                  content="How much will you charge monthly?"
                  style={ {
                    fontSize: '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '3em'
                  } } 
                />
                <Input
                  label={ { basic: true, content: 'EOS' } }
                  labelPosition='right'
                  placeholder='1.0000'
                  onChange={ this.inputPrice }
                />
                <Input
                  label={ { basic: true, content: 'Projects per month' } }
                  labelPosition='right'
                  placeholder='2'
                  onChange={ this.inputLimit }
                />
                <br />
                <Button primary onClick={ () => this.handleOpen()  } disabled={ this.state.price <= 0 && this.state.limit <= 0 }> Submit </Button>
              </div>
              : <div>
                <Header 
                  as="h4"
                  content="You don't have a channel, would you like to open one?"
                  style={ {
                    fontSize: '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '3em'
                  } } 
                />
                <Button primary onClick={ () => this.setState({ showSetPrice: true }) }> Yes </Button>
              </div>
          }
          
        </Container>
      </AuthedApp>
    )
  }

}

export default CreateChannel