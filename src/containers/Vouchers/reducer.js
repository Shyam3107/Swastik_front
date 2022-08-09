import * as actionTypes from "./actionTypes"

const initialState = {
  loading: false,
  vouchers: null,
  error: null,
  downloadLoading: false,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // GET CASES
    case actionTypes.GET_VOUCHERS_PENDING:
      return { ...initialState, loading: true }
    case actionTypes.GET_VOUCHERS_SUCCESS:
      return { ...initialState, vouchers: action.payload }
    case actionTypes.GET_VOUCHERS_FAILURE:
      return { ...initialState, error: action.payload }

    // ADD CASES
    case actionTypes.ADD_VOUCHERS_PENDING:
      return { ...state, loading: true }
    case actionTypes.ADD_VOUCHERS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.ADD_VOUCHERS_FAILURE:
      return { ...state, loading: false }

    // UPLOAD CASES
    case actionTypes.UPLOAD_VOUCHERS_PENDING:
      return { ...state, loading: true }
    case actionTypes.UPLOAD_VOUCHERS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.UPLOAD_VOUCHERS_FAILURE:
      return { ...state, loading: false }

    // EDIT CASES
    case actionTypes.EDIT_VOUCHERS_PENDING:
      return { ...state, loading: true }
    case actionTypes.EDIT_VOUCHERS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.EDIT_VOUCHERS_FAILURE:
      return { ...state, loading: false }

    // DELETE CASES
    case actionTypes.DELETE_VOUCHERS_PENDING:
      return { ...state, loading: true }
    case actionTypes.DELETE_VOUCHERS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.DELETE_VOUCHERS_FAILURE:
      return { ...state, loading: false }

    // DOWNLOAD CASES
    case actionTypes.DOWNLOAD_VOUCHERS_PENDING:
      return { ...state, downloadLoading: true }
    case actionTypes.DOWNLOAD_VOUCHERS_SUCCESS:
      return { ...state, downloadLoading: false }
    case actionTypes.DOWNLOAD_VOUCHERS_FAILURE:
      return { ...state, downloadLoading: false }

    default:
      return state
  }
}
