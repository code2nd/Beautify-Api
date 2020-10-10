import {
  SET_LOADING,
  SET_DOC_INFO,
  SET_MENU_DATA,
  SET_DOC_DATA
} from './actionTypes'

export const defaultState = {
  loading: true,
  docInfo: {},
  menuData: [],
  docData: {}
}

export default (state=defaultState, action) => {
  switch(action.type) {
    case SET_LOADING: 
      return {
        ...state,
        loading: action.loading
      }
    case SET_DOC_INFO: 
      return {
        ...state,
        docInfo: action.docInfo
      }
    case SET_MENU_DATA: 
      return {
        ...state,
        menuData: action.menuData
      }
    case SET_DOC_DATA: 
      return {
        ...state,
        docData: action.docData,
        docInfo: defaultState.docInfo
      }
    default: return state
  }
}