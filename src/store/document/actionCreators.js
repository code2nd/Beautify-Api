import {
  SET_LOADING,
  SET_DOC_INFO,
  SET_MENU_DATA,
  SET_DOC_DATA
} from './actionTypes'
import { 
  getDocByName, 
  getApiDoc, 
  getDocDataVisitor,
  getDefaultDataInfo
 } from '@/api'
 import Storage from '@/models/storage'
 import { apiDataProxy } from '@/utils/proxy'
 import { errorCodeMenu } from '@/utils/utils'
 import Config from '@/utils/config'
 import { defaultState } from './reducer'

const LStorage = new Storage('localStorage')

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading
})

export const setDocInfo = (docInfo) => ({
  type: SET_DOC_INFO,
  docInfo
})

export const setMenuData = (menuData) => ({
  type: SET_MENU_DATA,
  menuData
})

export const setDocData = (docData) => ({
  type: SET_DOC_DATA,
  docData
})

// 根据文档名称获取文档信息
export const toGetDocInfo = (name) => {
  return async (dispatch) => {
    try {
      const res = await getDocByName(name)
      dispatch(setDocInfo(res))
    } catch (err) {
      console.log(err)
      dispatch(setDocInfo({}))
    }
  }
}

// 获取默认示例文档信息
export const toGetDefaultDocInfo = () => {
  return async (dispatch) => {
    try {
      const res = await getDefaultDataInfo()
      dispatch(setDocInfo(res))
    } catch (err) {
      console.log(err)
      dispatch(setDocInfo({}))
    }
  }
}

// 根据路径获取文档数据
export const toGetDocData = (isLogin, name, storagedDocName) => {
  return async (dispatch) => {
    try {
      const _res = isLogin ? await getApiDoc(name) : await getDocDataVisitor(name)
      const res = apiDataProxy(_res)
      const _menuData = res.errorCode ? [...res.interfaces, errorCodeMenu(res.errorCode)] : [...res.interfaces]
      dispatch(setMenuData(_menuData))
      dispatch(setDocData(res))
      LStorage.set(storagedDocName, res, Config.expires)
    } catch (err) {
      console.log(err)
      dispatch(setDocData(defaultState.docData))
      dispatch(setMenuData(defaultState.menuData))
    }
    dispatch(setLoading(false))
  }
}
