import * as actionTypes from "./actionTypes"

const initialState = {
  loading: false,
  bills: null,
  shops: null,
  error: null,
  downloadLoading: false,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // GET CASES
    case actionTypes.BILLS_PENDING:
      return { ...initialState, loading: true }
    case actionTypes.BILLS_SUCCESS:
      return {
        ...initialState,
        bills: action.payload.data,
      }
    case actionTypes.BILLS_FAILURE:
      return { ...initialState, error: action.payload }

    // GET SHOPS CASES
    case actionTypes.GET_HARDWARE_SHOPS_NAME_PENDING:
      return { ...state, loading: true }
    case actionTypes.GET_HARDWARE_SHOPS_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        shops: action.payload.data,
      }
    case actionTypes.GET_HARDWARE_SHOPS_NAME_FAILURE:
      return { ...state, error: action.payload }

    // ADD CASES
    case actionTypes.ADD_HARDWARE_SHOPS_BILLS_PENDING:
      return { ...state, loading: true }
    case actionTypes.ADD_HARDWARE_SHOPS_BILLS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.ADD_HARDWARE_SHOPS_BILLS_FAILURE:
      return { ...state, loading: false }

    // UPLOAD CASES
    case actionTypes.UPLOAD_HARDWARE_SHOPS_BILLS_PENDING:
      return { ...state, loading: true }
    case actionTypes.UPLOAD_HARDWARE_SHOPS_BILLS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.UPLOAD_HARDWARE_SHOPS_BILLS_FAILURE:
      return { ...state, loading: false }

    // EDIT CASES
    case actionTypes.EDIT_HARDWARE_SHOPS_BILLS_PENDING:
      return { ...state, loading: true }
    case actionTypes.EDIT_HARDWARE_SHOPS_BILLS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.EDIT_HARDWARE_SHOPS_BILLS_FAILURE:
      return { ...state, loading: false }

    // DELETE CASES
    case actionTypes.DELETE_HARDWARE_SHOPS_BILLS_PENDING:
      return { ...state, loading: true }
    case actionTypes.DELETE_HARDWARE_SHOPS_BILLS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.DELETE_HARDWARE_SHOPS_BILLS_FAILURE:
      return { ...state, loading: false }

    // DOWNLOAD CASES
    case actionTypes.DOWNLOAD_HARDWARE_SHOPS_BILLS_PENDING:
      return { ...state, downloadLoading: true }
    case actionTypes.DOWNLOAD_HARDWARE_SHOPS_BILLS_SUCCESS:
      return { ...state, downloadLoading: false }
    case actionTypes.DOWNLOAD_HARDWARE_SHOPS_BILLS_FAILURE:
      return { ...state, downloadLoading: false }

    default:
      return state
  }
}
