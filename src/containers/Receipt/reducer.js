import * as actionTypes from "./actionTypes"

const initialState = {
  loading: false,
  receipts: null,
  error: null,
  downloadLoading: false,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_RECEIPT_PENDING:
      return { ...initialState, loading: true }
    case actionTypes.GET_RECEIPT_SUCCESS:
      return { ...initialState, receipts: action.payload }
    case actionTypes.GET_RECEIPT_FAILURE:
      return { ...initialState, error: action.payload }

    case actionTypes.ADD_RECEIPT_PENDING:
      return { ...state, loading: true }
    case actionTypes.ADD_RECEIPT_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.ADD_RECEIPT_FAILURE:
      return { ...state, loading: false }

    case actionTypes.UPLOAD_RECEIPT_PENDING:
      return { ...state, loading: true }
    case actionTypes.UPLOAD_RECEIPT_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.UPLOAD_RECEIPT_FAILURE:
      return { ...state, loading: false }

    case actionTypes.EDIT_RECEIPT_PENDING:
      return { ...state, loading: true }
    case actionTypes.EDIT_RECEIPT_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.EDIT_RECEIPT_FAILURE:
      return { ...state, loading: false }

    case actionTypes.DELETE_RECEIPT_PENDING:
      return { ...state, loading: true }
    case actionTypes.DELETE_RECEIPT_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.DELETE_RECEIPT_FAILURE:
      return { ...state, loading: false }

    case actionTypes.DOWNLOAD_RECEIPT_PENDING:
      return { ...state, downloadLoading: true }
    case actionTypes.DOWNLOAD_RECEIPT_SUCCESS:
      return { ...state, downloadLoading: false }
    case actionTypes.DOWNLOAD_RECEIPT_FAILURE:
      return { ...state, downloadLoading: false }

    default:
      return state
  }
}
