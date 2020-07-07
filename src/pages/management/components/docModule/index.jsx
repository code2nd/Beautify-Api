import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Popover } from 'antd'
import ActionPopover from '../actionPopover'

const DocModule = (props) => {

  const {
    info: {
      name,
      description,
      deletable
    }
  } = props

  const [isHover, setIsHover] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const textOverflow = (text, cnt) => {
    return text.length > cnt ? `${text.substring(0, cnt)}...` : text
  }

  const handleItemClick = (type) => {
    switch(type) {
      case 'edit': 
        props.onEditClick()
      break;
      case 'json': 
        props.onDownloadJsonClick()
      break;
      case 'word': 
        props.onDownloadWordClick()
      break;
      case 'delete': 
        props.onDeleteClick()
      break;
      default: break;
    }
  }

  const handleGotoDoc = (name) => {
    props.gotoDoc(name)
  }

  const handleMouseOver = () => {
    if (!isHover) {
      setIsHover(true)
    }
  }

  const handleMouseLeave = () => {
    if (isHover && !isVisible) {
      setIsHover(false)
    }
  }

  const handleVisibleChange = (visible) => {
    setIsVisible(visible)
  }

  useEffect(() => {
    if (!isVisible) {
      setIsHover(false)
    }
  }, [isVisible])

  return <div 
    className={`doc-module ${isHover ? 'module-hover' : ''}`} 
    onMouseOver={handleMouseOver}
    onMouseLeave={handleMouseLeave}
  >
      <div className="doc-icon" onClick={handleGotoDoc.bind(this, name)} />
      <div className="doc-info">
        <Popover placement="top" content={name}>
          <p className="title">{textOverflow(name, 20)}</p>
        </Popover>
        <Popover placement="bottom" content={description}>
          <p className="description">{textOverflow(description, 10)}</p>
        </Popover>
      </div>
      {
        deletable ? <Popover 
          className={`edit-popover ${isHover ? 'edit-popover-hover' : ''}`}
          placement="rightTop" 
          content={<ActionPopover handleItemClick={handleItemClick} />} 
          trigger="click"
          visible={isVisible}
          onVisibleChange={handleVisibleChange}
        >
          <span className="iconfont icon-sheng_lve shenglve" title="操作" />
        </Popover> : null
      }
    </div>
}

export default withRouter(DocModule)