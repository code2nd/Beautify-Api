import {
  SET_DATA,
  SET_MENU_DATA
} from './actionTypes'

export const defaultState = {
  data: {},
  menuData: []
}

export default (state=defaultState, action) => {
  switch(action.type) {
    case SET_DATA: 
      return {
        ...state,
        data: action.data
      }
    case SET_MENU_DATA: 
      return {
        ...state,
        menuData: action.menuData
      }
    default: return state
  }
}