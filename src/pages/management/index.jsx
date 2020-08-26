import React, { useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, message, Spin } from 'antd'
import { connect } from 'react-redux'
import DocModule from './components/docModule'
import UploadFile from './components/uploadFile'
import Storage from '../../models/storage'
import BaseForm from '../../components/baseForm'
import { validateMust } from '../../utils/utils'
import { fileEditForm } from '../../utils/formConfig'
import * as managementCreators from '../../store/management/actionCreators'
import './index.less'

const SStorage = new Storage('sessionStorage')
const LStorage = new Storage('localStorage')

const Management = (props) => {

  const { 
    isLogin,
    dataLoading,
    docList,
    isModalShow,
    isConfirmShow,
    isEditModalShow,
    confirmLoading,
    fileName,
    editData,
    // handleSetDataLoading,
    handleGetDocList,
    handleGetVisitorDocList,
    handleModalShow,
    handleConfirmShow,
    handleSetFileName,
    handleDeleteFile,
    handleSetEditData,
    handleSetIsEditModalShow,
    handleSetConfirmLoading,
    handleDeleteRecord,
    handlePostDocRecord,
    handleShearFile,
    handleUpdateDocRecord,
    handleDownload
  } = props

  const [form] = Form.useForm()
  const getFormValue = useRef()

  const editMust = [
    {
      key: 'name',
      value: '文件名'
    },
    {
      key: 'description',
      value: '描述'
    }
  ]

  // 覆盖文件
  const handleConfirmOk = async () => {
    const { name, originUrl: url, filePath } = SStorage.get('uploadedFileInfo')
    await handleShearFile(name, url, filePath)
    handleConfirmShow(false)
  }

  // 取消覆盖文件
  const handleConfirmCancel = async () => {
    const { filePath, wordUrl } = SStorage.get('uploadedFileInfo')
    // 删除刚上传的文件
    await handleDeleteFile(filePath)
    await handleDeleteFile(wordUrl)
    handleConfirmShow(false)
  }

  const handleOk = e => {
    const { description } = form.getFieldsValue()
    const { url, name } = SStorage.get('uploadedFileInfo')
    
    if (description) {
      handlePostDocRecord(name, url, description)
      handleModalShow(false)
      handleSetConfirmLoading(false)
    } else {
      message.info('请对项目进行简单描述')
    }
  }

  // 取消描述
  const handleCancel = async (e) => {
    const { url } = SStorage.get('uploadedFileInfo')
    await handleDeleteFile(url)
    handleModalShow(false)
  }

  // 编辑 点击
  const handleEditClick = useCallback(async (data) => {
    const { id, name, description } = data
    handleSetEditData({ id, name, description })
    handleSetIsEditModalShow(true)
  }, [handleSetEditData, handleSetIsEditModalShow])

  // 清除文档缓存
  const removeDocStorage = (name) => {
    const storage = LStorage.get(`${name}DocData`)
    if (storage) {
      LStorage.remove(`${name}DocData`)
    }
  }

  // 删除
  const handleDeleteClick = async (key, name) => {
    await handleDeleteRecord(key)
    removeDocStorage(name)
    handleGetDocList()
  }

  const handleDownloadJsonClick = (name) => {
    handleDownload('json', name)
  }

  const handleDownloadWordClick = (name) => {
    handleDownload('word', name)
  }

  // 提交修改
  const handleEditOk = async () => {
    const result = getFormValue.current.formFields()
    if (validateMust(result, editMust)) {
      handleUpdateDocRecord(editData.id, result.name, result.description)
    }
    handleSetEditData({})
    // console.log('提交修改')
  }

  const handleEditCancel = () => {
    handleSetEditData({})
    handleSetIsEditModalShow(false)
  }

  // 跳转到文档页面
  const handleGotoDoc = (name) => {
    props.history.push({ pathname: '/document', state: { name } })
  }

  const handleShowCustomPopover = (e) => {
    e.stopImmediatePropagation && e.stopImmediatePropagation()
    if (props.showCustomPopover) {
      props.handleSetShowCustomPopover(false)
    }
  }

  useEffect(() => {
    if (docList.length < 1) {
      if (isLogin) {
        handleGetDocList()
      } else {
        handleGetVisitorDocList()
      }
    }
  }, [isLogin, docList, handleGetDocList, handleGetVisitorDocList])

  return <div className="container" onClick={handleShowCustomPopover}>
    <main className="page-main">
      <UploadFile 
        handleModalShow={handleModalShow} 
        handleConfirmShow={handleConfirmShow} 
        handleSetFileName={handleSetFileName}
      />
      <Spin spinning={dataLoading}>
        <section className="doc-list">
          {
            docList.length ? docList.map((item) => {
              return <DocModule 
                key={item.id}
                info={item}
                onEditClick={handleEditClick.bind(this, item)}
                onDeleteClick={handleDeleteClick.bind(this, item.id, item.name)}
                onDownloadJsonClick={handleDownloadJsonClick.bind(this, item.name)}
                onDownloadWordClick={handleDownloadWordClick.bind(this, item.name)}
                gotoDoc={handleGotoDoc}
              />
            }) : null
          }
        </section>
      </Spin>
      <Modal
        title="提示"
        visible={isConfirmShow}
        confirmLoading={confirmLoading}
        okText="是"
        cancelText="否"
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        maskClosable={false}
      >
        {`${fileName}已经存在，继续上传将覆盖原文件，是否继续操作？`}
      </Modal>
      <Modal
        title="添加描述"
        visible={isModalShow}
        confirmLoading={confirmLoading}
        okText="确认"
        cancelText="取消"
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        maskClosable={false}
      >
        <Form form={form}>
          <Form.Item
            key="description"
            label="描述"
            name="description"
          >
            <Input placeholder="对项目进行简单描述" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="修改"
        visible={isEditModalShow}
        confirmLoading={confirmLoading}
        okText="确认"
        cancelText="取消"
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        destroyOnClose={true}
        maskClosable={false}
      >
        <BaseForm
          ref={getFormValue}
          formList={fileEditForm()}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapCol={{ sapn: 18 }}
          initialValues={editData}
        />
      </Modal>
    </main>
 </div>
}

Management.propTypes = {
  isLogin: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {

  const {
    dataLoading,
    docList,
    isModalShow,
    isConfirmShow,
    isEditModalShow,
    confirmLoading,
    fileName,
    editData
  } = state.management

  return {
    isLogin: state.header.isLogin,
    dataLoading,
    docList,
    isModalShow,
    isConfirmShow,
    isEditModalShow,
    confirmLoading,
    fileName,
    editData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetDataLoading(dataLoading) {
      dispatch(managementCreators.setDataLoading(dataLoading))
    },
    handleGetDocList() {
      dispatch(managementCreators.toGetDocList())
    },
    handleGetVisitorDocList() {
      dispatch(managementCreators.toGetVisitorDocList())
    },
    handleModalShow(isModalShow) {
      dispatch(managementCreators.setIsModalShow(isModalShow))
    },
    handleConfirmShow(isConfirmShow) {
      dispatch(managementCreators.setIsConfirmShow(isConfirmShow))
    },
    handleSetFileName(fileName) {
      dispatch(managementCreators.setFileName(fileName))
    },
    handleDeleteFile(path) {
      dispatch(managementCreators.toDeleteFile(path))
    },
    handleSetEditData(editData) {
      dispatch(managementCreators.setEditData(editData))
    },
    handleSetIsEditModalShow(isEditModalShow) {
      dispatch(managementCreators.setIsEditModalShow(isEditModalShow))
    },
    handleSetConfirmLoading(confirmLoading) {
      dispatch(managementCreators.setConfirmLoading(confirmLoading))
    },
    handleDeleteRecord(key) {
      dispatch(managementCreators.toDeleteRecord(key))
    },
    handlePostDocRecord(name, url, description) {
      dispatch(managementCreators.toPostDocRecord(name, url, description))
    },
    handleShearFile(name, url, filePath) {
      dispatch(managementCreators.toShearFile(name, url, filePath))
    },
    handleUpdateDocRecord(id, name, description) {
      dispatch(managementCreators.toUpdateDocRecord(id, name, description))
    },
    handleDownload(fileType, fileName) {
      dispatch(managementCreators.toDownloadFile(fileType, fileName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Management)