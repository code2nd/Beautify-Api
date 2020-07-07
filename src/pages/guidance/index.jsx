import React, { useState, useEffect, useCallback } from 'react'
import { message } from 'antd'
import { getGuidanceConfigFile } from '../../api'
import Storage from '../../models/storage'
import Structure from '../../container/structrue'
import CustomMenu from '../../components/customMenu'
import DocContent from './components/docContent'

const LStorage = new Storage('localStorage')

const Guidance = () => {

  const [hash, setHash] = useState('')
  const [data, setData] = useState({})
  const [menuData, setMenuData] = useState([])

  const handleMenuClick = useCallback((key) => {
    setHash(key)
  }, [])

  const handleGetGuidanceConfigFile = async () => {
    const menuDataArr = []
    const storedGuidanceData = LStorage.get('guidanceData')
    if (storedGuidanceData) {
      setData(storedGuidanceData)
      for (const item in storedGuidanceData) {
        menuDataArr.push(storedGuidanceData[item])
      }
      setMenuData(menuDataArr)
    } else {
      try {
        const res = await getGuidanceConfigFile()
        if (Object.keys(res).length) {
          setData(res)
          LStorage.set('guidanceData', res)
          for (const item in res) {
            menuDataArr.push(res[item])
          }
          setMenuData(menuDataArr)
        }
      } catch (error) {
        console.info(error)
        message.warning('获取配置文件失败！')
      }
    }
  }

  useEffect(() => {
    handleGetGuidanceConfigFile()
  }, [])

  return <div className="s-container">
          <main>
            <Structure 
              menu={<CustomMenu 
                      hash={hash}
                      menuData={menuData}
                      handleMenuClick={handleMenuClick} 
                    />} 
              content={<DocContent hash={hash} data={data} />}
            />
          </main>
        </div>
}

export default Guidance