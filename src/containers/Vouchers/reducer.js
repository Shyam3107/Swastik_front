import * as actionTypes from "./actionTypes"

const initialState = {
  loading: false,
  vouchers: null,
  error: null,
  addLoading: false,
  editLoading: false,
  deleteLoading: false,
  uploadLoading: false,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_VOUCHERS_PENDING:
      return { ...initialState, loading: true }
    case actionTypes.GET_VOUCHERS_SUCCESS:
      return { ...initialState, vouchers: action.payload }
    case actionTypes.GET_VOUCHERS_FAILURE:
      return { ...initialState, error: action.payload }

    case actionTypes.ADD_VOUCHERS_PENDING:
      return { ...state, addLoading: true }
    case actionTypes.ADD_VOUCHERS_SUCCESS:
      return { ...state, addLoading: false }
    case actionTypes.ADD_VOUCHERS_FAILURE:
      return { ...state, addLoading: false }

    case actionTypes.UPLOAD_VOUCHERS_PENDING:
      return { ...state, uploadLoading: true }
    case actionTypes.UPLOAD_VOUCHERS_SUCCESS:
      return { ...state, uploadLoading: false }
    case actionTypes.UPLOAD_VOUCHERS_FAILURE:
      return { ...state, uploadLoading: false }

    case actionTypes.EDIT_VOUCHERS_PENDING:
      return { ...state, editLoading: true }
    case actionTypes.EDIT_VOUCHERS_SUCCESS:
      return { ...state, editLoading: false }
    case actionTypes.EDIT_VOUCHERS_FAILURE:
      return { ...state, editLoading: false }

    case actionTypes.DELETE_VOUCHERS_PENDING:
      return { ...state, deleteLoading: true }
    case actionTypes.DELETE_VOUCHERS_SUCCESS:
      return { ...state, deleteLoading: false }
    case actionTypes.DELETE_VOUCHERS_FAILURE:
      return { ...state, deleteLoading: false }

    default:
      return state
  }
}
