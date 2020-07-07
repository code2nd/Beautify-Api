import request from './request'
import Config from '../utils/config'

const { baseUrl } = Config

export const uploadFileAction = baseUrl + '/file/upLoad';

// 获取文档页面配置文件
export const getGuidanceConfigFile = () => request('/config/guidance.json', {})

// 登录
export const login = (username, password) => request(baseUrl + '/user/login', { username, password }, 'POST')

// 注册
export const register = (username, password1, password2) => request(baseUrl + '/user/register', { username, password1, password2 }, 'POST')

// 登出
export const logout = () => request(baseUrl + '/user/logout', {}, 'POST')

// 获取用户信息
export const getUserInfo = () => request(baseUrl + '/user/userInfo', {})

// 获取用户权限菜单
export const getUserMenu = () => request(baseUrl + '/menu', {})

// 删除文件
export const deleteFile = (path) => request(baseUrl + '/file/delete', { path }, 'DELETE')

// 获取下载文件信息
export const getDownloadFileInfo = (fileType, fileName) => request(baseUrl + '/file/downloadFile', {fileType, fileName})

/**
 * 管理
 */

// 查询文档列表
export const getDocList = () => request(baseUrl + '/doc/docs', {})

// 根据id查询单条记录
export const getOneDocInfo = (id) => request(baseUrl + '/doc/oneDoc', {id})

// 往数据库插入一条文档记录
export const postDocRecord = (name, url, description) => request(baseUrl + '/doc/docs', { name, url, description }, 'POST')

// 修改文档记录
export const updateDocRecord = (id, name, description) => request(baseUrl + '/doc/docs', { id, name, description }, 'PUT')

// 删除一条文档记录
export const deleteDocRecord = (id) => request(baseUrl + '/doc/docs', { id }, 'DELETE')

// 覆盖文件
export const shearFile = (name, url, filePath) => request(baseUrl + '/file/cover', { name, url, filePath }, 'POST') 

// 根据文件名获取文档记录
export const getDocByName = (name) => request(baseUrl + '/doc/name', { name })

// 游客获取文档列表
export const getDocListVisitor = () => request(baseUrl + '/doc/visitorDocList', {})

// 游客获取默认文档信息
export const getDefaultDataInfo = () => request(baseUrl + '/doc/visitorDocInfo', {})



/**
 *  接口
 */
export const getApiDoc = (url) => request(baseUrl + '/file/doc', { url })

// 游客获取默认文档
export const getDocDataVisitor = (url) =>  request(baseUrl + '/file/visitorDocData', {url})


/**
 * 后台管理
 */

 // 获取用户列表
 export const getUserList = () => request(baseUrl + '/user/users', {})