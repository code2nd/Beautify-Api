import { message } from 'antd'
import {
  SET_DATA,
  SET_MENU_DATA
} from './actionTypes'
import Storage from '@/models/storage'
import { getGuidanceConfigFile } from '@/api'

const LStorage = new Storage('localStorage')

export const setData = (data) => ({
  type: SET_DATA,
  data
})

export const setMenuData = (menuData) => ({
  type: SET_MENU_DATA,
  menuData
})

/**
 * 请求文档页面配置文件
 */
export const getGuidance = () => {
  return async (dispatch) => {
    const menuDataArr = []
    const storedGuidanceData = LStorage.get('guidanceData')
    if (storedGuidanceData) {
      dispatch(setData(storedGuidanceData))
      for (const item in storedGuidanceData) {
        menuDataArr.push(storedGuidanceData[item])
      }
      dispatch(setMenuData(menuDataArr))
    } else {
      try {
        const res = await getGuidanceConfigFile()
        if (Object.keys(res).length) {
          dispatch(setData(res))
          LStorage.set('guidanceData', res)
          for (const item in res) {
            menuDataArr.push(res[item])
          }
          dispatch(setMenuData(menuDataArr))
        }
      } catch (error) {
        console.info(error)
        message.warning('获取配置文件失败！')
      }
    }
  }
}