import React, { memo } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

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

BaseModal.propTypes = {
  title: PropTypes.string.isRequired, 
  okText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  isShow: PropTypes.bool.isRequired, 
  confirmLoading: PropTypes.bool.isRequired, 
  content: PropTypes.array.isRequired
}

export default memo(BaseModal)