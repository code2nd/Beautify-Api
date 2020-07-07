import React from 'react'
import { 
  UserOutlined, 
  LockOutlined
} from '@ant-design/icons'

const loginForm = () =>  {
  return [{
    type: 'INPUT',
    field: 'username',
    placeholder: '字母或数字组成',
    prefix: <UserOutlined className="site-form-item-icon" />,
    rules: [{ required: true, message: '请输入用户名!' }]
  }, {
    type: 'INPUT',
    field: 'password',
    inputType: 'password',
    placeholder: '字母或数字组成',
    prefix: <LockOutlined className="site-form-item-icon" />,
    rules: [{ required: true, message: '请输入密码!' }]
  }, {
    type: 'SUBMIT',
    field: 'login',
    btnType: 'primary',
    text: '登录',
    block: true
  }]
}

const registerForm = () => {
  return [{
    type: 'INPUT',
    field: 'username',
    placeholder: '字母或数字组成',
    prefix: <UserOutlined className="site-form-item-icon" />,
    rules: [{ required: true, message: '请输入用户名!' }]
  }, {
    type: 'INPUT',
    field: 'password1',
    placeholder: '字母或数字组成',
    inputType: 'password',
    prefix: <LockOutlined className="site-form-item-icon" />,
    rules: [{ required: true, message: '请输入密码!' }]
  }, {
    type: 'INPUT',
    field: 'password2',
    placeholder: '请重新输入密码',
    inputType: 'password',
    prefix: <LockOutlined className="site-form-item-icon" />,
    rules: [
      { 
        required: true, 
        message: '请确认密码!' 
      },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue('password1') === value) {
            return Promise.resolve();
          }
          return Promise.reject('两次输入的密码不一致!');
        },
      })
    ]
  }, {
    type: 'SUBMIT',
    field: 'register',
    text: '注册',
    btnType: 'primary',
    block: true
  }, {
    type: 'BUTTON',
    field: 'toLogin',
    text: '返回登录',
    block: true,
    btnType: 'default',
  }]
}

const fileDescription = () => {
  return [
    {
      type: 'INPUT',
      label: '描述',
      field: 'description',
      placeholder: '对项目进行简单描述'
    }
  ]
}

const fileEditForm = () => {
  return [
    {
      type: 'INPUT',
      label: '文件名',
      field: 'name',
      placeholder: '文件名'
    },
    {
      type: 'INPUT',
      label: '描述',
      field: 'description',
      placeholder: '对项目进行简单描述'
    }
  ]
}

export {
  loginForm,
  registerForm,
  fileDescription,
  fileEditForm
}