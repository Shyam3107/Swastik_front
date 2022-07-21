import * as actionTypes from "./actionTypes"

const initialState = {
  loading: false,
  diesels: null,
  error: null,
  addLoading: false,
  editLoading: false,
  deleteLoading: false,
  uploadLoading: false,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_DIESEL_PENDING:
      return { ...initialState, loading: true }
    case actionTypes.GET_DIESEL_SUCCESS:
      return { ...initialState, diesels: action.payload }
    case actionTypes.GET_DIESEL_FAILURE:
      return { ...initialState, error: action.payload }

    case actionTypes.ADD_DIESEL_PENDING:
      return { ...state, addLoading: true }
    case actionTypes.ADD_DIESEL_SUCCESS:
      return { ...state, addLoading: false }
    case actionTypes.ADD_DIESEL_FAILURE:
      return { ...state, addLoading: false }

    case actionTypes.UPLOAD_DIESEL_PENDING:
      return { ...state, uploadLoading: true }
    case actionTypes.UPLOAD_DIESEL_SUCCESS:
      return { ...state, uploadLoading: false }
    case actionTypes.UPLOAD_DIESEL_FAILURE:
      return { ...state, uploadLoading: false }

    case actionTypes.EDIT_DIESEL_PENDING:
      return { ...state, editLoading: true }
    case actionTypes.EDIT_DIESEL_SUCCESS:
      return { ...state, editLoading: false }
    case actionTypes.EDIT_DIESEL_FAILURE:
      return { ...state, editLoading: false }

    case actionTypes.DELETE_DIESEL_PENDING:
      return { ...state, deleteLoading: true }
    case actionTypes.DELETE_DIESEL_SUCCESS:
      return { ...state, deleteLoading: false }
    case actionTypes.DELETE_DIESEL_FAILURE:
      return { ...state, deleteLoading: false }

    default:
      return state
  }
}
