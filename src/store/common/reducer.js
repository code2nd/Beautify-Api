import {
  SET_HASH
} from './actionTypes'

export const defaultState = {
  hash: ''
}

export default function (state=defaultState, action) {
  switch(action.type) {
    case SET_HASH:
      return {
        ...state,
        hash: action.hash
      }
    default: return state
  }
}