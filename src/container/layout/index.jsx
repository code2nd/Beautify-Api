import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
// import { Link } from 'react-router-dom';
import { memo } from 'react';
import { GithubOutlined } from '@ant-design/icons'
import Title from './components/title'
import Navi from './components/navi'
import User from './components/user'
import { getUserInfo } from '../../api'
import { setIsLogin } from '../../store/header/actionCreators'
import './index.less';

const MainLayout = memo((props) => {

  const [userInfo, setUserInfo] = useState({isLogin: false})

  const { handleDispatchIsLogin } = props

  const memoizedHandleDispatchIsLogin = useCallback(handleDispatchIsLogin)

  useEffect(() => {
    async function handleGetUserInfo () {
      try {
        const res = await getUserInfo()
        if (res.isLogin) {
          setUserInfo(res)
          memoizedHandleDispatchIsLogin(true)
        }
      } catch (err) {
        setUserInfo({isLogin: false})
        console.log(err)
      }
    }

    handleGetUserInfo()
  }, [memoizedHandleDispatchIsLogin])

  return <>
          <header className="header">
            <Row>
              <Col span={12}>
                <Title />
              </Col>
              <Col className="navi-wrap" span={12}>
                <Navi />
                <a href="https://github.com/Jalamy/Beautify-Api" target="_blank" rel="noopener noreferrer" style={{marginRight: '10px'}}>
                  <GithubOutlined style={{ fontSize: '28px' }} />
                </a>
                <User userInfo={userInfo} />
              </Col>
            </Row>
          </header>
          <content className="content">
            { props.children }
          </content>
        </>
})

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDispatchIsLogin (isLogin) {
      dispatch(setIsLogin(isLogin))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)