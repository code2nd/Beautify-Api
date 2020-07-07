import React from 'react'
import { Badge, Typography } from 'antd'
import DangerP from '../../components/dangerP'

const { Title } = Typography

const PageTitle = (props) => {

  const {
    title,
    host,
    basePath,
    version,
    description
  } = props
  
  return <div className="page-title">
    <hgroup>
      <Badge 
        count={version} 
        offset={[24, 8]}
        style={{
          background: '#7d8492'
        }}
      >
        <Title level={2}>{title}</Title>
      </Badge>
      <DangerP text={host ? `[ Base URL: <strong>${host}${basePath}</strong> ]` : ''} />
      <p className="description">{description}</p>
    </hgroup>
  </div>
}

export default PageTitle