import React from 'react';
import spinner from './spinner.gif'

export default () => {
  return (
    <div>
      <img src={spinner} alt= 'Loading...' style={{
          margin: 'auto',
          width: '200px',
          display: 'block'
      }}
      />
    </div>
  )
}
