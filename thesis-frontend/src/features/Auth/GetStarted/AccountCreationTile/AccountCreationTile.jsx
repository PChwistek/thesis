import React, { Component } from 'react'
import {
  Tile,
  Box,
} from 'bloomer'
import cn from 'classnames'
import AccountCreationForm from './AccountCreationForm'


class AccountCreationTile extends Component {
  render() {
    const { getStartedBack, available, identity } = this.props
    return (
      <div>
        <Tile isAncestor style={ { justifyContent: 'center' } }>
          <Tile isSize={ 8 } isParent className={ cn('clickable') }>
            <Tile isChild render={
              props => (
                <Box { ...props } >
                  {
                    !available && !identity
                      ? <div>
                        Scatter not unlocked. Please unlock scatter and refresh the page. 
                      </div>
                      : <AccountCreationForm { ...this.props }/>
                  }
                </Box>
              )
            } />
          </Tile>
        </Tile>
        <div onClick={ getStartedBack } className={ 'clickable' }> Back </div>
      </div>
    )
  }
}

export default AccountCreationTile