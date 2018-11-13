import React, { Component } from 'react'
import {
  Tile,
  Box,
} from 'bloomer'
import cn from 'classnames'

class AccountCreationForm extends Component {
  render() {
    const { getStartedNext, unlocked, isScatter } = this.props
    return (
      <Tile isAncestor style={ { justifyContent: 'center' } }>
        <Tile isSize={ 8 } isParent className={ cn('clickable') } onClick={ getStartedNext }>
          <Tile isChild render={
            props => (
              <Box { ...props } >
                {
                  isScatter && !unlocked 
                    ? <div>
                      Scatter not unlocked. Please unlock scatter and refresh the page. 
                    </div>
                    : <div>
                      FORM!
                    </div>
                }
              </Box>
            )
          } />
      </Tile>
      </Tile>
    )
  }
}

export default AccountCreationForm