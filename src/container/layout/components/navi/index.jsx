import React from 'react'
import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd'
import './index.less'

const Navi = (props) => {

  const [current, setCurrent] = useState('')

  const handleClick = e => {
    const key = e.key
    setCurrent(key)
    switch (key) {
      case 'guidance': props.history.push('/') 
        break
      case 'management': props.history.push('/management') 
        break
      case 'document': props.history.push('/document') 
        break
      default: props.history.push('/')
    }
  }

  useEffect(() => {
    const pathname = props.location.pathname
    const key = pathname.substring(1)
    if (!key) {
      setCurrent('guidance')
    } else {
      setCurrent(key)
    }
  }, [current, props.location.pathname])

  return <>
    <Menu 
      className="header-navi-menu" 
      onClick={handleClick} 
      selectedKeys={current} 
      mode="horizontal"
    >
      <Menu.Item key="guidance">
        文档
      </Menu.Item>
      <Menu.Item key="management">
        管理
      </Menu.Item>
      <Menu.Item key="document">
        接口
      </Menu.Item>
    </Menu>
  </>

}

export default withRouter(Navi)