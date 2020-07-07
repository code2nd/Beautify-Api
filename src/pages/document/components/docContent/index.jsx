import React, { memo, useEffect, useRef } from 'react'
import { BackTop } from 'antd'
import PageTitle from '../../../../components/pageTitle'
import ApiModule from '../apiModule'
import ErrorCode from '../../../../components/errorCode'
import Storage from '../../../../models/storage'
import './index.less'

const LStorage = new Storage('localStorage')

const DocContent = memo((props) => {

  const {
    hash,
    docData
  } = props

  const { 
    host,
    basePath,
    info: { title, description, version },
    interfaces,
    errorCode
  } = docData

  const columns = [
    {
      key: 1,
      title: '错误码',
      dataIndex: 'code',
    },
    {
      key: 2,
      title: '含义',
      dataIndex: 'meaning',
    }
  ]

  const customContent = useRef()

  const handleDocData = (docData) => {
    let data = docData
    let result = []
    for (let item of data) {
      if (item.children) {
        result = result.concat(item.children)
      }
    }

    return result
  }

  const handleClick = (e) => {
    const ele = e.target.getAttribute('data-name')
    if (ele === 'refresh') {
      e.stopPropagation()
      const docName = LStorage.get('historyDoc')
      LStorage.remove(`${docName}DocData`)
      window.location.reload()
    }
  } 

  useEffect(() => {
    const AimDom = document.getElementById(hash)
    if (AimDom) {
      AimDom.scrollIntoView({
        block: 'start',
        behavior: 'smooth' 
      })
    }
  }, [hash])

  return <div 
    id="custom-content" 
    className="custom-content" 
    ref={customContent}
  >
    <PageTitle
      title={title}
      host={host}
      basePath={basePath}
      version={version}
      description={description}
    />
    {
      handleDocData(interfaces).map((item) => {
        const { 
          key, 
          title, 
          method, 
          path, 
          responses, 
          parameters, 
          response_description 
        } = item
        return <ApiModule
                key={key}
                hash={key}
                title={title}
                method={method}
                path={path}
                responses={responses}
                parameters={parameters}
                response_description={response_description}
              />
      })
    }
    {
      errorCode && errorCode.dataSource && errorCode.dataSource.length ? 
        <ErrorCode columns={columns} errorCode={errorCode} title={errorCode.title} /> : null
    }
    <BackTop
      target={() => document.getElementById('custom-content')}
      visibilityHeight={-1}
      onClick={handleClick}
    >
      <span className="iconfont icon-huidaodingbu" title="回到顶部"  data-name="up" />
      <span className="iconfont icon-shuaxin" title="刷新" data-name="refresh" />
    </BackTop>
  </div>
})

export default DocContent