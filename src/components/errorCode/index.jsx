import React from 'react'
import { Table } from 'antd'
import ModuleTitle from '../moduleTitle'
import PropTypes from 'prop-types'

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

ErrorCode.propTypes = {
  title: PropTypes.string.isRequired,
  errorCode: PropTypes.object.isRequired, 
  columns: PropTypes.array.isRequired
}

export default ErrorCode