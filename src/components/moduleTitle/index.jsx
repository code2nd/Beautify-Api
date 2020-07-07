import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography

const ModuleTitle = (props) => {

  const {
    hash,
    title,
    style
  } = props

  return <Title id={hash} style={{ margin: '50px 0px 10px 0px', ...style }} level={3}>{title}</Title>
}

export default ModuleTitle