import React from 'react'
import PropTypes from 'prop-types'

const ParaTitle = (props) => {
  const {
    title,
    size
  } = props

  return <p className="para-title" style={{ fontSize: size }}>{title}:</p>
}

ParaTitle.propTypes = {
  title: PropTypes.string,
  size: PropTypes.number
}

export default ParaTitle