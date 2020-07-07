import React from 'react'
import { memo } from 'react'
import { connect } from 'react-redux'
import { Upload, message } from 'antd'
import { uploadFileAction } from '../../../../api'
import { InboxOutlined } from '@ant-design/icons'
import Storage from '../../../../models/storage'
import './index.less'

const { Dragger } = Upload;

const UploadFile = memo((props) => {

  const { isLogin } = props

  const SStorage = new Storage('sessionStorage')

  const handleChange = (info) => {
    const { status } = info.file
    if (status === 'done') {
      const result = info.file.response
      SStorage.set('uploadedFileInfo', result)
      props.handleSetFileName(result.name)
      if (result.isExist) {
        props.handleConfirmShow(true)
      } else {
        props.handleModalShow(true)
      }
    } else if (status === 'error') {
      message.error(info.file.response.msg)
    }
  }

  const DraggerProps = {
    name: 'file',
    accept: '.json',
    multiple: true,
    data: { type: 'doc' },
    disabled: isLogin ? false : true,
    action: uploadFileAction,
    onChange: handleChange
  }

  return <>
    <Dragger style={{marginTop: '40px'}} {...DraggerProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{isLogin ? '点击或拖拽json文件到此区域上传' : '建议您登录以便更好的保存您的数据'}</p>
    </Dragger>
  </>
})

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin
  }
}

export default connect(mapStateToProps)(UploadFile)