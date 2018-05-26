import React from 'react'

/* eslint-disable */

function MetaMaskError () {
  const text = `Please login into MetaMask.` 
  const text2 = `If you don't have the MetaMask extension installed, 
    you can learn more about MetaMask`

  return (
    <div id='meta-mask-error' className='has-text-centered'>
      <span className='title'> {text} </span>
      <br />
      <br />
      <span className='subtitle'> 
        {text2}
        <a href='https://metamask.io/' target='_blank'> here.</a>
      </span>
    </div>
  )
}

export default MetaMaskError