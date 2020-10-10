import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd'
import ModuleTitle from '../../../../components/moduleTitle'
import ParaTitle from '../../../../components/paraTitle'
import CodeArea from '../../../../components/codeArea'
import './index.less'

const ApiModule = (props) => {

  const {
    hash,
    title,
    method,
    path,
    responses,
    parameters,
    response_description
  } = props

  return <>
    <ModuleTitle hash={hash} title={title} />
    <ParaTitle title="URL" size={16} />
    <CodeArea codes={`${method && method.toUpperCase()} ${path}`} hasQuot={false} />
    {
      parameters && parameters.length ? <> 
        <ParaTitle title="Parameter" size={16} />
        <List
          split={false}
          dataSource={parameters}
          renderItem={item => (
            <List.Item>
              {`${item.name}${item.required ? '' : ' ? '}: <${item.type}> ${item.description}`}
            </List.Item>
          )}
        /></> : 
        null
    }
    
    <ParaTitle title="Response" size={16} />
    <CodeArea codes={responses.success.example} />
    {
      response_description && response_description.length ? <>
      <ParaTitle title="Response_Description" size={16} />
      <List
        split={false}
        dataSource={response_description}
        renderItem={item => (
          <List.Item>
            {`${item.name}: ${item.description}`}
          </List.Item>
        )}
      /></> : 
      null
    }
  </>
}

ApiModule.propTypes = {
  hash: PropTypes.string,
  title: PropTypes.string,
  method: PropTypes.string,
  path: PropTypes.string,
  responses: PropTypes.object,
  parameters: PropTypes.array,
  response_description: PropTypes.array
}

export default ApiModule