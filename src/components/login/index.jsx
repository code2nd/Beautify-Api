import React, { memo } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import BaseForm from '../../components/baseForm'
import { loginForm } from '../../utils/formConfig'
import './index.less'

const Login = memo((props) => {

  const handleSwichToReg = () => {
    props.handleSwichToReg('register')
  }

  const handleBtnClick = (type) => {
    console.log(type)
  }

  const handleGithubAuth = (currentPath) => {
    const authUrl = 'https://github.com/login/oauth/authorize?client_id=383ac64a98fca7cdd347&scope=user'
    const specs = `width=500, height=500, top=${(window.screen.height-500)/2-250}, left=${(window.screen.width-500)/2-250}, location=no, titlebar=no`
    window.open(authUrl, 'newWindow', specs)
    
    window.addEventListener('message', function (e) {
      console.log(e)
      this.window.location.reload()
    }, false)
  }

  return <div className="login-module">
    <BaseForm 
      layout='vertical'
      formList={loginForm()}
      handleBtnClick={handleBtnClick}
      formSubmit={props.handleFormSubmit}
    />
    <div className="third-part">
      <span className="third-part-text">第三方登录</span>
    </div>
    <div className="third-part-list">
      <GithubOutlined onClick={handleGithubAuth} style={{ fontSize: '28px', color: '' }} />
    </div>
    <Button block onClick={handleSwichToReg}>注册新账号</Button>
  </div>
})

Login.propTypes = {
  handleSwichToReg: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.header.isLogin
  }
}

export default connect(mapStateToProps)(Login)