import React from 'react'
import { Typography } from 'antd'
import PropTypes from 'prop-types'

const { Title } = Typography

const ModuleTitle = (props) => {

  const {
    hash,
    title,
    style
  } = props

  return <Title id={hash} style={{ margin: '50px 0px 10px 0px', ...style }} level={3}>{title}</Title>
}

ModuleTitle.propTypes = {
  hash: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.object
}

export default ModuleTitle