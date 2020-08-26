import {
  SET_LOADING,
  SET_DOC_INFO,
  SET_MENU_DATA,
  SET_NORMAL,
  SET_DOC_DATA
} from './actionTypes'
import { 
  getDocByName, 
  getApiDoc, 
  getDocDataVisitor,
  getDefaultDataInfo
 } from '../../api'
 import Storage from '../../models/storage'
 import { apiDataProxy } from '../../utils/proxy'
 import { errorCodeMenu } from '../../utils/utils'

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

export const setNormal = (normal) => ({
  type: SET_NORMAL,
  normal
})

export const setDocData = (docData) => ({
  type: SET_DOC_DATA,
  docData
})

// 根据文档名称获取文档记录
export const toGetDocInfo = (name) => {
  return async (dispatch) => {
    try {
      const res = await getDocByName(name)
      dispatch(setDocInfo(res))
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err)
      dispatch(setDocInfo({}))
      dispatch(setLoading(false))
    }
    
  }
}

export const toGetDefaultDocInfo = () => {
  return async (dispatch) => {
    try {
      const res = await getDefaultDataInfo()
      dispatch(setDocInfo(res))
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err)
      dispatch(setDocInfo({}))
      dispatch(setLoading(false))
    }
  }
}

export const toGetDocData = (isLogin, url, storagedDocName) => {
  return async (dispatch) => {
    try {
      const _res = isLogin ? await getApiDoc(url) : await getDocDataVisitor(url)
      const res = apiDataProxy(_res)
      const _menuData = res.errorCode ? [...res.interfaces, errorCodeMenu(res.errorCode)] : [...res.interfaces]
      dispatch(setDocData(res))
      dispatch(setMenuData(_menuData))
      dispatch(setLoading(false))
      LStorage.set(storagedDocName, res, 60*60*24*365) // 缓存有效期一年
    } catch (err) {
      console.log(err)
      dispatch(setNormal(false))
      dispatch(setLoading(false))
    }
  }
}
