import React, { memo } from 'react'
import { connect } from 'react-redux'
import { Avatar, Popover, List, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import UserModal from '../../../../components/userModal'
import { setShowLoginModal } from '../../../../store/actionCreators'
import { logout } from '../../../../api'

const data = [
  {
    key: 1,
    title: '个人中心',
    action: 'personal'
  },
  {
    key: 2,
    title: '退出登录',
    action: 'logout'
  }
]

const handleLogout = async () => {
  try {
    const res = await logout()
    if (!res.error_code) {
      message.success(res.msg)
      window.location.reload()
    } else {
      message.error(res.msg)
    }
  } catch (err) {
    console.log(err)
  }
}

const onListClick = (action) => {
  // console.log(action) 
  switch (action) {
    case 'logout':
      handleLogout(); break;
    default: break;
  }
}

const Menu = () => {
  return <List
          size="small"
          dataSource={data}
          renderItem={item => <List.Item
                                onClick={onListClick.bind(this, item.action)}
                              >{item.title}</List.Item>}
        />
}

const User = memo((props) => {

  const { userInfo } = props

  const handleAvatarClick = () => {
    props.handleDispatchShowLoginModal(true)
  }

  return <>
    {
      userInfo.isLogin ? 
        <Popover 
          placement="bottomRight" 
          content={Menu}
          trigger="click"
        >
          <Avatar 
            size={32} 
            src={userInfo.avatarUrl}
            style={{cursor: 'pointer'}} 
          />
        </Popover> : 
        <Avatar 
          size={32} 
          icon={<UserOutlined />} 
          style={{cursor: 'pointer'}} 
          onClick={handleAvatarClick}
        />
    }
    <UserModal />
  </>
})

const mapStateToState = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDispatchShowLoginModal(isShow=false) {
      dispatch(setShowLoginModal(isShow))
    }
  }
}

export default connect(mapStateToState, mapDispatchToProps)(User)