import React, {memo } from 'react'

const Mask = memo(() => {
  return <div
    style={{
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0, 
      left: 0,
      background: 'rgba(0, 0, 0, .4)',
      zIndex: 2000
    }}
  />
})

export default Mask