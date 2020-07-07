import React from 'react'
import { Table } from 'antd'
import ModuleTitle from '../moduleTitle'

const ErrorCode = (props) => {

  const { 
    title,
    errorCode: { key, description, dataSource }, 
    columns
  } = props

  return <>
    <ModuleTitle 
      hash={key} 
      title={title} 
    />
    <p>{description}</p>
    {
      dataSource.map((item) => {
        return <div key={item.code}>
          <p style={{ marginTop: '30px', fontSize: '14px', lineHeight: '22px' }}>
            <span style={{color: '#c7254e', fontStyle: 'italic' }}>{item.code} </span> 
            <span>{item.meaning}</span>
          </p>
          <Table 
            rowKey={(record,index) => index+''}
            columns={columns} 
            dataSource={item.dataSource} 
            pagination={false}
          />
        </div>
      })
    }
  </>
}

export default ErrorCode