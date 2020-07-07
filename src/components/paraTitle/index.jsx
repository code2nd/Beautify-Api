import React from 'react'

const ParaTitle = (props) => {
  const {
    title,
    size
  } = props

  return <p className="para-title" style={{ fontSize: size }}>{title}:</p>
}

export default ParaTitle