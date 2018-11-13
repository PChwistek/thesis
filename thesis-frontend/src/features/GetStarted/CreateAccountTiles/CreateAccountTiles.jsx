/* eslint-disable */
import React, { Component } from 'react'
import {
  Tile,
  Box,
} from 'bloomer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'

import './CreateAccountTiles.scss'
import imgScatter from '../../../static/images/scatter.png'

class CreateAccountTiles extends Component {

  render() {
    const { getStartedNext } = this.props
    return (
      <Tile isAncestor style={ { justifyContent: 'center' } }>
        <Tile isSize={ 4 } isParent className={ 'clickable' } onClick={ getStartedNext }>
          <Tile isChild render={
            props => (
              <Box { ...props } >
                <div>
                  <img
                    src={ imgScatter }
                    alt={ 'Scatter Icon' }
                    className={ 'scatter-image' }
                  />
                </div>
                <div className={ 'tile-text' }> I have Scatter installed </div>
              </Box>
            )
          } />
        </Tile>
        <Tile isSize={ 4 } isParent className={ 'clickable' }>
          <Tile isChild className={ 'tile-box' } render={
            props => (
              <Box {...props} >
                <div className={ 'tile-text' }> I don't have Scatter installed <br /> Coming soon... </div>
              </Box>
            )
          } />
        </Tile>
      </Tile>
    )
  }
}

export default CreateAccountTiles