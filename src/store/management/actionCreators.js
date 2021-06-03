import { message } from 'antd'
import {
  SET_DATA_LOADING,
  SET_DOCLIST,
  SET_IS_MODAL_SHOW,
  SET_IS_CONFIRM_SHOW,
  SET_IS_EDIT_MODAL_SHOW,
  SET_CONFIRM_LOADING,
  SET_FILE_NAME,
  SET_EDIT_DATA
} from './actionTypes'
import {
  getDocList,
  getDocListVisitor,
  deleteFile,
  deleteDocRecord,
  postDocRecord,
  shearFile,
  updateDocRecord,
  getDownloadFileInfo
} from '@/api'
import Storage from '@/models/storage'

const SStorage = new Storage('sessionStorage')

export const setDataLoading = (dataLoading) => ({
  type: SET_DATA_LOADING,
  dataLoading
})

export const setDocList = (docList) => ({
  type: SET_DOCLIST,
  docList
})

export const setIsModalShow = (isModalShow) => ({
  type: SET_IS_MODAL_SHOW,
  isModalShow
})

export const setIsConfirmShow = (isConfirmShow) => ({
  type: SET_IS_CONFIRM_SHOW,
  isConfirmShow
})

export const setFileName = (fileName) => ({
  type: SET_FILE_NAME,
  fileName
})

export const setEditData = (editData) => ({
  type: SET_EDIT_DATA,
  editData
})

export const setIsEditModalShow = (isEditModalShow) => ({
  type: SET_IS_EDIT_MODAL_SHOW,
  isEditModalShow
})

export const setConfirmLoading = (confirmLoading) => ({
  type: SET_CONFIRM_LOADING,
  confirmLoading
})

export const toGetDocList = () => {
  return async (dispatch) => {
    dispatch(setDataLoading(true))
    try {
      const res = await getDocList()
      dispatch(setDocList(res))
    } catch (err) {
      dispatch(setDocList([]))
      console.log(err)
    }
    dispatch(setDataLoading(false))
  }
}

export const toGetVisitorDocList = () => {
  return async (dispatch) => {
    dispatch(setDataLoading(true))
    try {
      const res = await getDocListVisitor()
      dispatch(setDocList(res))
    } catch (err) {
      dispatch(setDocList([]))
      console.log(err)
    }
    dispatch(setDataLoading(false))
  }
}

export const toDeleteFile = () => {
  return async (dispatch) => {
    try {
      await deleteFile()
      dispatch(setIsConfirmShow(false))
      SStorage.remove('uploadedFileInfo')
    } catch (err) {
      console.log(err)
    }
  }
}

export const toDeleteRecord = (key) => {
  return async () => {
    try {
      await deleteDocRecord(key)
      message.success('删除成功')
    } catch (err) {
      console.log(err)
      message.error('删除失败')
    }
  }
}

export const toPostDocRecord = (name, description) => {
  return async (dispatch) => {
    try {
      const res = await postDocRecord(name, description)
      if (!res.error_code) {
        dispatch(toGetDocList())
      }
    } catch (err) {
      console.log(err)
      dispatch(toDeleteFile())
    }
  }
}

// 覆盖文件
export const toShearFile = (name, description) => {
  return async (dispatch) => {
    try {
      await shearFile(name, description)
      dispatch(setIsModalShow(false))
      dispatch(toGetDocList())
    } catch (err) {
      console.log(err)
    }
  }
}

// 编辑请求
export const toUpdateDocRecord = (id, name, description) => {
  return async (dispatch) => {
    try {
      await updateDocRecord(id, name, description)
      dispatch(toGetDocList())
      dispatch(setIsEditModalShow(false))
    } catch (err) {
      if (err.error_code === 60001) {
        message.error(err.msg)
      } else {
        console.info(err)
      }
    }
  }
}

// 下载文件
export const toDownloadFile = (fileType, fileName) => {
  return async () => {
    try {
      const res = await getDownloadFileInfo(fileType, fileName)
      if (res) {
        const { filePath, name } = res
        const host = process.env.NODE_ENV === 'development' ? 'http://localhost' : 'https://jalamy.cn'
        const url = `${host}:3005/v1/file/download?filePath=${filePath}&fileName=${name}`
        window.open(url, '_self')
      } else {
        message.info('下载的文件不存在')
      }
    } catch (err) {
      message.error(err.msg)
    }
  }
}