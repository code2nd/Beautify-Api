import React, { useState, useCallback, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Spin, Result } from 'antd'
import Storage from '../../models/storage'
import Structure from '../../container/structrue'
import CustomMenu from '../../components/customMenu'
import DocContent from './components/docContent'
import { 
  getDocByName, 
  getApiDoc, 
  getDocDataVisitor,
  getDefaultDataInfo
} from '../../api'
import { apiDataProxy } from '../../utils/proxy'

const LStorage = new Storage('localStorage')

const Document = (props) => {

  const { isLogin } = props

  const [hash, setHash] = useState('')
  const [loading, setLoading] = useState(false)
  const [docInfo, setDocInfo] = useState({})
  const [menuData, setMenuData] = useState([])
  const [normal, setNormal] = useState(true)
  const [docData, setDocData] = useState({
    basePath: "",
    host: "",
    info: {},
    interfaces: [],
    parameters: [],
    errorCode: {}
  })

  const storagedDocName = useRef()

  // 根据文档名称获取文档记录
  const handleGetDocInfo = useCallback(async (name) => {
    try {
      const res = isLogin ? await getDocByName(name) : await getDefaultDataInfo()
      setDocInfo(res)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }, [isLogin])

  const _handleGetDocData = useCallback(async (url) => {
    try {
      const _res = isLogin ? await getApiDoc(url) : await getDocDataVisitor(url)
      const res = apiDataProxy(_res)
      const _menuData = res.errorCode ? [...res.interfaces, errorCodeMenu(res.errorCode)] : [...res.interfaces]
      setDocData(res)
      setMenuData(_menuData)
      setLoading(false)
      LStorage.set(storagedDocName.current, res, 60*60*24*365) // 缓存有效期一年
    } catch (err) {
      console.log(err)
      setNormal(false)
      setLoading(false)
    }
  }, [isLogin])

  // 获取文档数据
  const handleGetDocData = useCallback(async () => {
    if (Object.keys(docInfo).length) {
      const { url, isUpdate, name } = docInfo
      storagedDocName.current = `${name}DocData`
      if (isUpdate) {
        _handleGetDocData(url)
      } else {
        const storagedDocData = LStorage.get(storagedDocName.current)
        if (storagedDocData) {
          if (Object.keys(storagedDocData).length) {
            const errObj = errorCodeMenu(storagedDocData.errorCode)
            const _menuData = errObj ? [...storagedDocData.interfaces, errorCodeMenu(storagedDocData.errorCode)] : [...storagedDocData.interfaces]
            setDocData(storagedDocData)
            setMenuData(_menuData)
          } else {
            setNormal(false)
            // message.warning('请检查api文件是否配置正确')
          }
          setLoading(false)
        } else {
          // 缓存过期了,重新请求
          _handleGetDocData(url)
        }
      }
    }
  }, [docInfo, _handleGetDocData])

  const handleMenuClick = useCallback((key) => {
    setHash(key)
  }, [])

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

  useEffect(() => {
    setLoading(true)
    const historyDoc = LStorage.get('historyDoc')
    const _docName = (props.location.state && props.location.state.name) || historyDoc || 'example'
    LStorage.set('historyDoc', _docName)
    handleGetDocInfo(_docName)
  }, [props.location.state, handleGetDocInfo])

  useEffect(() => {
    handleGetDocData()
  }, [handleGetDocData])

  return <div className="s-container">
          <Spin spinning={loading}>
            <main>
              {
                normal ? <Structure 
                  menu={<CustomMenu 
                          hash={hash}
                          menuData={menuData}
                          handleMenuClick={handleMenuClick} 
                        />} 
                  content={<DocContent 
                              hash={hash}
                              docData={docData}
                            />}
                /> : <Result
                status="404"
                title="文档为空或文档不存在"
              />
              }
            </main>
          </Spin>
        </div>
}

const mapStateToProps = (state) => ({
  isLogin: state.isLogin
})

export default connect(mapStateToProps)(Document)