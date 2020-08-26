import {
  SHOW_LOGIN_MODAL,
  IS_LOGIN
} from './actionTypes'

export const setShowLoginModal = (showLoginModal) => ({
  type: SHOW_LOGIN_MODAL,
  showLoginModal
})

export const setIsLogin = (isLogin) => ({
  type: IS_LOGIN,
  isLogin
})