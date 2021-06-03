import React, { memo, useState } from 'react'
import { Modal, Result, Button, message } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setShowLoginModal } from '@/store/header/actionCreators'
import BaseForm from '../baseForm'
import Login from '../login'
import { registerForm } from '@/utils/formConfig'
import { login, register } from '@/api'
import { pMd5 } from '@/utils/utils'
import './index.less'

const UserModal = memo((props) => {
  const { showLoginModal } = props

  const [type, setType] = useState('login') // login/register/registerSuccess/registerRepeated/loginSuccess

  const onCancel = () => {
    props.handleDispatchShowLoginModal(false)
    setType('login')
  }

  const handleSwichLoginReg = (type) => {
    setType(type)
  }

  const handleToLogin = () => {
    setType('login')
  }

  const handleToRegister = () => {
    setType('register')
  }

  const handleLogin = async (fields) => {
    let { username, password } = fields
    password = pMd5(username, password)
    try {
      const res = await login(username, password)
      if (!res.error_code) {
        setType('loginSuccess')
        window.location.reload()
      }
    } catch (err) {
      message.error(err.msg);
    }
  }

  const handleRegister = async (fields) => {
    // console.log(fields)
    let { username, password1, password2 } = fields
    if (password1 !== password2) {
      message.warn('两次输入的密码不一致！')
    } else {
      password1 = pMd5(username, password1)
      password2 = pMd5(username, password2)
      try {
        const res = await register(username, password1, password2)
        if (!res.error_code) {
          setType('registerSuccess')
        }
      } catch (err) {
        setType('registerRepeated')
        console.log(err)
      }
    }
  }

  const Content = (type) => {
    switch (type) {
      // 登录
      case 'login': 
        return <Login 
          handleSwichToReg={handleSwichLoginReg} 
          handleFormSubmit={handleLogin}
        />
      // 注册
      case 'register': 
        return <BaseForm 
          layout='vertical'
          handleBtnClick={handleSwichLoginReg.bind(this, 'login')}
          formList={registerForm()}
          formSubmit={handleRegister}
        />
      case 'registerSuccess':
        return <Result
          status="success"
          title="注册成功"
          extra={[
            <Button 
              type="primary" 
              key="toLogin"
              onClick={handleToLogin}
            >去登录</Button>
          ]}
        />
      case 'registerRepeated':
        return <Result
          status="error"
          title="用户名已被注册"
          extra={[
            <Button 
              type="primary" 
              key="toRegister"
              onClick={handleToRegister}
            >重新注册</Button>
          ]}
        />
      case 'loginSuccess':
        return <Result
          status="success"
          title="登录成功，跳转中..."
        />
      default: 
        return <Login 
          handleSwichToReg={handleSwichLoginReg} 
          handleFormSubmit={handleLogin}loginSuccess
        />
    }
  }

  return <Modal
    title={ type === 'login' ? '登录' : '注册' }
    zIndex={100}
    visible={ showLoginModal }
    destroyOnClose={ true }
    footer = { null }
    style={{
      width: 200
    }}
    bodyStyle = {{
      padding: '24px 124px'
    }}
    onCancel={onCancel}
  >
    { Content(type) }
  </Modal>
})

UserModal.propTypes = {
  showLoginModal: PropTypes.bool.isRequired,
  handleDispatchShowLoginModal: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    showLoginModal: state.header.showLoginModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDispatchShowLoginModal(isShow=false) {
      dispatch(setShowLoginModal(isShow))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserModal) 