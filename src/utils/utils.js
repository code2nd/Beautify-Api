import { message } from "antd"
import md5 from 'md5'

/**
 * 验证必填项
 * @param {object} obj 结果集合
 * @param {Array} must 必填字段集合
 */
const validateMust = (obj, must) => {
  for (const item of must) {
    if (!Reflect.get(obj, item.key)) {
      message.warning(`${item.value}是必填项`)
      return false
    }
  } 
  return true
}

const clearAllCookie = () => {
  let date = new Date()
  date.setTime(date.getTime()-10000);
  let keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
      for (let i =  keys.length; i--;)
        document.cookie=keys[i]+"=0; expire="+date.toGMTString()+"; path=/";
  }
}

const errorCodeMenu = (errorCodeData) => {
  let errObj
  if (errorCodeData) {
    errObj = {
      key: "errorHandle",
      title: "错误处理",
      children: [errorCodeData]
    }
  } else {
    errObj = null
  }
  return errObj
}

const pMd5 = (username, password) => {
  return md5(md5(password) + username)
}

export {
  validateMust,
  clearAllCookie,
  errorCodeMenu,
  pMd5
}