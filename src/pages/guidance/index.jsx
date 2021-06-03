import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Structure from '@/container/structrue'
import CustomMenu from '@/components/customMenu'
import DocContent from './components/docContent'
import { getGuidance } from '@/store/guidance/actionCreators'
import { setHash } from '@/store/common/actionCreators'

const Guidance = (props) => {

  const {
    hash,
    data,
    menuData,
    handleGetGuidanceConfigFile
  } = props

  useEffect(() => {
    handleGetGuidanceConfigFile()
  }, [handleGetGuidanceConfigFile])

  return <div className="s-container">
          <main>
            <Structure
              menu={<CustomMenu 
                      hash={hash}
                      menuData={menuData}
                      handleMenuClick={(key) => props.handleSetHash(key)} 
                    />} 
              content={<DocContent hash={hash} data={data} />}
            />
          </main>
        </div>
}

const mapStateToProps = (state) => {
  return {
    hash: state.common.hash,
    data: state.guidance.data,
    menuData: state.guidance.menuData
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    handleGetGuidanceConfigFile() {
      dispatch(getGuidance())
    },
    handleSetHash(hash) {
      dispatch(setHash(hash))
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Guidance)