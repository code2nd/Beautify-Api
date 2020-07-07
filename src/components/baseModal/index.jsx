import React, { memo } from 'react'
import { Modal } from 'antd'

const BaseModal = (props) => {

  const { 
    title, 
    okText,
    cancelText,
    isShow, 
    confirmLoading, 
    content 
  } = props

  return <Modal
    title={title}
    visible={isShow}
    confirmLoading={confirmLoading}
    okText={okText}
    cancelText={cancelText}
    onOk={props.handleOk}
    onCancel={props.handleCancel}
    destroyOnClose={true}
    maskClosable={false}
  >
    {
      content
    }
  </Modal>
}

export default memo(BaseModal)