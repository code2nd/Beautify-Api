import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spin, Result } from 'antd'
import Storage from '../../models/storage'
import Structure from '../../container/structrue'
import CustomMenu from '../../components/customMenu'
import DocContent from './components/docContent'
import { setHash } from '../../store/common/actionCreators'
import * as documentCreators from '../../store/document/actionCreators'
import { errorCodeMenu } from '../../utils/utils'

const LStorage = new Storage('localStorage')

const Document = (props) => {

  const { 
    isLogin,
    hash,
    loading,
    docInfo,
    menuData,
    normal,
    docData,
    handleGetDocDataByUrl,
    handleSetDocData,
    handleSetMenuData,
    handleSetNormal,
    handleSetLoading,
    handleGetDocInfo,
    handleGetDefaultDocInfo
  } = props

  const storagedDocName = useRef()

  // 获取文档数据
  const handleGetDocData = useCallback(async () => {
    if (Object.keys(docInfo).length) {
      const { url, isUpdate, name } = docInfo
      storagedDocName.current = `${name}DocData`
      if (isUpdate) {
        handleGetDocDataByUrl(isLogin, url, storagedDocName.current)
      } else {
        const storagedDocData = LStorage.get(storagedDocName.current)
        if (storagedDocData) {
          if (Object.keys(storagedDocData).length) {
            const errObj = errorCodeMenu(storagedDocData.errorCode)
            const _menuData = errObj ? [...storagedDocData.interfaces, errorCodeMenu(storagedDocData.errorCode)] : [...storagedDocData.interfaces]
            handleSetDocData(storagedDocData)
            handleSetMenuData(_menuData)
          } else {
            handleSetNormal(false)
            // message.warning('请检查api文件是否配置正确')
          }
          handleSetLoading(false)
        } else {
          // 缓存过期了,重新请求
          handleGetDocDataByUrl(isLogin, url, storagedDocName.current)
        }
      }
    }
  }, [
    isLogin, 
    docInfo,
    handleGetDocDataByUrl,
    handleSetDocData,
    handleSetMenuData,
    handleSetNormal,
    handleSetLoading
  ])

  useEffect(() => {
    const historyDoc = LStorage.get('historyDoc')
    const fileName = props.location.state && props.location.state.name
    const _docName = fileName || historyDoc || 'example'
    LStorage.set('historyDoc', _docName)
    if (isLogin) {
      if (!Object.keys(docInfo).length || (fileName && (fileName !== docInfo.name))) {
        handleGetDocInfo(_docName)
      }
    } else {
      if (!Object.keys(docInfo).length) {
        handleGetDefaultDocInfo()
      }
    }
  }, [
    isLogin, 
    docInfo, 
    props.location.state,
    handleGetDocInfo,
    handleGetDefaultDocInfo
  ])

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
                          handleMenuClick={(key) => props.handleSetHash(key)} 
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

Document.propTypes = {
  isLogin: PropTypes.bool
}

const mapStateToProps = (state) => {
  const {
    loading,
    docInfo,
    menuData,
    normal,
    docData
  } = state.document

  return {
    isLogin: state.header.isLogin,
    hash: state.common.hash,
    loading,
    docInfo,
    menuData,
    normal,
    docData
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleSetHash(hash) {
    dispatch(setHash(hash))
  },
  handleGetDocInfo(name) {
    dispatch(documentCreators.toGetDocInfo(name))
  },
  handleGetDefaultDocInfo() {
    dispatch(documentCreators.toGetDefaultDocInfo())
  },
  handleSetLoading(loading) {
    dispatch(documentCreators.setLoading(loading))
  },
  handleSetDocData(docData) {
    dispatch(documentCreators.setDocData(docData))
  },
  handleSetMenuData(menuData) {
    dispatch(documentCreators.setMenuData(menuData))
  },
  handleSetNormal(normal) {
    dispatch(documentCreators.setNormal(normal))
  },
  handleGetDocDataByUrl(isLogin, url, storagedDocName) {
    dispatch(documentCreators.toGetDocData(isLogin, url, storagedDocName))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Document)