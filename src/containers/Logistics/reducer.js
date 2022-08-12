import * as actionTypes from "./actionTypes"

const initialState = {
  loading: false,
  logistics: null,
  error: null,
  downloadLoading: false,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // GET CASES
    case actionTypes.GET_LOGISTICS_PENDING:
      return { ...initialState, loading: true }
    case actionTypes.GET_LOGISTICS_SUCCESS:
      return {
        ...initialState,
        logistics: action.payload.data,
      }
    case actionTypes.GET_LOGISTICS_FAILURE:
      return { ...initialState, error: action.payload }

    // ADD CASES
    case actionTypes.ADD_LOGISTICS_PENDING:
      return { ...state, loading: true }
    case actionTypes.ADD_LOGISTICS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.ADD_LOGISTICS_FAILURE:
      return { ...state, loading: false }

    // UPLOAD CASES
    case actionTypes.UPLOAD_LOGISTICS_PENDING:
      return { ...state, loading: true }
    case actionTypes.UPLOAD_LOGISTICS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.UPLOAD_LOGISTICS_FAILURE:
      return { ...state, loading: false }

    // EDIT CASES
    case actionTypes.EDIT_LOGISTICS_PENDING:
      return { ...state, loading: true }
    case actionTypes.EDIT_LOGISTICS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.EDIT_LOGISTICS_FAILURE:
      return { ...state, loading: false }

    // DELETE CASES
    case actionTypes.DELETE_LOGISTICS_PENDING:
      return { ...state, loading: true }
    case actionTypes.DELETE_LOGISTICS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.DELETE_LOGISTICS_FAILURE:
      return { ...state, loading: false }

    // DOWNLOAD CASES
    case actionTypes.DOWNLOAD_LOGISTICS_PENDING:
      return { ...state, downloadLoading: true }
    case actionTypes.DOWNLOAD_LOGISTICS_SUCCESS:
      return { ...state, downloadLoading: false }
    case actionTypes.DOWNLOAD_LOGISTICS_FAILURE:
      return { ...state, downloadLoading: false }

    default:
      return state
  }
}
