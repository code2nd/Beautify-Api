import {
  SHOW_LOGIN_MODAL,
  IS_LOGIN
} from './constants'

const defaultState = {
  showLoginModal: false,
  isLogin: false
}

export default (state=defaultState, action) => {
  switch (action.type) {
    case SHOW_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: action.showLoginModal
      }
    case IS_LOGIN:
      return {
        ...state,
        isLogin: action.isLogin
      }
    default: return state
  }
}