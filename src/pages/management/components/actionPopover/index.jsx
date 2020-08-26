import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd'
import './index.less'

const ActionPopover = (props) => {

  const data = [
    {
      title: '编辑',
      type: 'edit',
      icon: <span className="iconfont icon-bianji icon-edit" />
    },
    {
      title: '下载json',
      type: 'json',
      icon: <span className="iconfont icon-xiazai icon-json" />
    },
    {
      title: '下载word',
      type: 'word',
      icon: <span className="iconfont icon-doc icon-word" />
    },
    {
      title: '删除',
      type: 'delete',
      icon: <span className="iconfont icon-shanchu icon-delete" />
    }
  ]

  return <>
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={item.icon}
            title={item.title}
            onClick={props.handleItemClick.bind(this, item.type)}
          />
        </List.Item>
      )}
    />
  </>
}

ActionPopover.propTypes = {
  handleItemClick: PropTypes.func.isRequired
}

export default ActionPopover