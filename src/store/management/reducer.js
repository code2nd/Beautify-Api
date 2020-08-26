import {
  SET_DATA_LOADING,
  SET_DOCLIST,
  SET_IS_MODAL_SHOW,
  SET_IS_CONFIRM_SHOW,
  SET_IS_EDIT_MODAL_SHOW,
  SET_CONFIRM_LOADING,
  SET_FILE_NAME,
  SET_EDIT_DATA
} from './actionTypes'

export const defaultState = {
  dataLoading: false,
  docList: [],
  isModalShow: false,
  isConfirmShow: false,
  isEditModalShow: false,
  confirmLoading: false,
  fileName: '',
  editData: {}
}

export default (state=defaultState, action) => {
  switch (action.type) {
    case SET_DATA_LOADING:
      return {
        ...state,
        dataLoading: action.dataLoading
      }
    case SET_DOCLIST:
      return {
        ...state,
        docList: action.docList
      }
    case SET_IS_MODAL_SHOW:
      return {
        ...state,
        isModalShow: action.isModalShow
      }
    case SET_IS_CONFIRM_SHOW:
      return {
        ...state,
        isConfirmShow: action.isConfirmShow
      }
    case SET_IS_EDIT_MODAL_SHOW:
      return {
        ...state,
        isEditModalShow: action.isEditModalShow
      }
    case SET_CONFIRM_LOADING:
      return {
        ...state,
        confirmLoading: action.confirmLoading
      }
    case SET_FILE_NAME:
      return {
        ...state,
        fileName: action.fileName
      }
    case SET_EDIT_DATA:
      return {
        ...state,
        editData: action.editData
      }
    default: return state
  }
}