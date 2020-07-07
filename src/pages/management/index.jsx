import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Modal, Form, Input, message, Spin } from 'antd'
import { connect } from 'react-redux'
import DocModule from './components/docModule'
import UploadFile from './components/uploadFile'
import { 
  getDocList,
  getDocListVisitor,
  deleteFile, 
  postDocRecord ,
  deleteDocRecord,
  updateDocRecord,
  shearFile,
  getDownloadFileInfo
} from '../../api'
import Storage from '../../models/storage'
import BaseForm from '../../components/baseForm'
// import BaseModal from '../../components/baseModal'
import { validateMust } from '../../utils/utils'
import { fileEditForm } from '../../utils/formConfig'
import './index.less'

const SStorage = new Storage('sessionStorage')
const LStorage = new Storage('localStorage')

const Management = (props) => {

  const { isLogin } = props

  const [loading, setLoading] = useState(false)
  const [docList, setDocList] = useState([])
  const [isModalShow, setIsModalShow] = useState(false)
  const [isConfirmShow, setIsConfirmShow] = useState(false)
  const [isEditModalShow, setIsEditModalShow] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [editData, setEditData] = useState({})

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

  const handleGetDocList = useCallback(async () => {
    setLoading(true)
    try {
      const res = isLogin ? await getDocList() : await getDocListVisitor()
      setDocList(res)
      setLoading(false)
    } catch (err) {
      setDocList([])
      setLoading(false)
      console.log(err)
    }
  }, [isLogin])

  // 删除文件
  const handleDeleteFile = async (path) => {
    try {
      await deleteFile(path)
      setIsConfirmShow(false)
      SStorage.remove('uploadedFileInfo')
    } catch (err) {
      console.log(err)
    }
  }

  // 往数据库插入一条文档信息
  const handlePostDocRecord = async (name, url, description) => {
    try {
      const res = await postDocRecord(name, url, description)
      if (!res.error_code) {
        message.success('上传成功')
        handleGetDocList()
      } else {
        message.error(res.msg)
      }
    } catch (err) {
      console.log(err)
      handleDeleteFile(url)
      message.error('上传失败')
    }
  }
  
  // 删除一条记录
  const handleDeleteRecord = async (id) => {
    try {
      await deleteDocRecord(id)
      message.success('删除成功')
    } catch (err) {
      console.log(err)
      message.error('删除失败')
    }
  }

  // 覆盖记录
  const handleShearFile = async (name, url, filePath) => {
    try {
      await shearFile(name, url, filePath)
      message.success('上传成功')
    } catch (err) {
      console.log(err)
    }
  }

  // 编辑请求
  const handleUpdateDocRecord = async (id, name, description) => {
    try {
      await updateDocRecord(id, name, description)
      handleGetDocList()
      message.success('修改成功')
      setIsEditModalShow(false)
    } catch (err) {
      if (err.error_code === 60001) {
        message.error(err.msg)
      } else {
        console.info(err)
      }
    }
  }

  const handleModalShow = (isShow) => {
    setIsModalShow(isShow)
  }

  const handleConfirmShow = (isShow) => {
    setIsConfirmShow(isShow)
  }

  const handleSetFileName = (name) => {
    /* const fileInfo = {name, path}
    SStorage.set('uploadedFileInfo', fileInfo) */
    setFileName(name)
  }

  // 覆盖文件
  const handleConfirmOk = async () => {
    const { name, originUrl: url, filePath } = SStorage.get('uploadedFileInfo')
    await handleShearFile(name, url, filePath)
    setIsConfirmShow(false)
  }

  // 取消覆盖文件
  const handleConfirmCancel = async () => {
    // console.log(SStorage.get('uploadedFileInfo'))
    const { filePath, wordUrl } = SStorage.get('uploadedFileInfo')
    await handleDeleteFile(filePath)
    await handleDeleteFile(wordUrl)
    setIsConfirmShow(false)
    // 删除刚上传的文件
  }

  const handleOk = e => {
    const { description } = form.getFieldsValue()
    const { url, name } = SStorage.get('uploadedFileInfo')
    
    if (description) {
      handlePostDocRecord(name, url, description)
      setIsModalShow(false)
      setConfirmLoading(false)
    } else {
      message.info('请对项目进行简单描述')
    }
  }

  // 取消描述
  const handleCancel = async (e) => {
    const { url } = SStorage.get('uploadedFileInfo')
    await handleDeleteFile(url)
    setIsModalShow(false)
  }

  // 编辑 点击
  const handleEditClick = useCallback(async (data) => {
    // await handleGetOneDocInfo(key)
    const { id, name, description } = data
    setEditData({ id, name, description })
    setIsEditModalShow(true)
    // console.log('编辑', key)
  }, [])

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

  // 下载文件
  const handleDownload = async (fileType, fileName) => {
    try {
      const res = await getDownloadFileInfo(fileType, fileName)
      if (res) {
        const { filePath, name } = res
        const host = process.env.NODE_ENV === 'development' ? 'localhost' : 'jalamy.cn'
        const url = `http://${host}:3005/v1/file/download?filePath=${filePath}&fileName=${name}`
        window.open(url, '_self')
      } else {
        message.info('下载的文件不存在')
      }
    } catch (err) {
      message.error(err.msg)
    }
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
    // setEditData({})
    // console.log('提交修改')
  }

  const handleEditCancel = () => {
    // setEditData({})
    setIsEditModalShow(false)
    // console.log('取消修改')
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
    handleGetDocList()
  }, [handleGetDocList])

  return <div className="container" onClick={handleShowCustomPopover}>
    <main className="page-main">
      <UploadFile 
        handleModalShow={handleModalShow} 
        handleConfirmShow={handleConfirmShow} 
        handleSetFileName={handleSetFileName}
      />
      <Spin spinning={loading}>
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

const mapStateToProps = (state) => {
  const { isLogin } = state

  return {
    isLogin
  }
}

export default connect(mapStateToProps)(Management)