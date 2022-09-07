import * as actionTypes from "./actionTypes"

const initialState = {
  loading: false,
  diesels: null,
  pumpNames: null,
  error: null,
  downloadLoading: false,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // GET CASES
    case actionTypes.GET_DIESEL_PENDING:
      return { ...state, loading: true }
    case actionTypes.GET_DIESEL_SUCCESS:
      return { ...state, loading: false, diesels: action.payload }
    case actionTypes.GET_DIESEL_FAILURE:
      return { ...state, loading: false, error: action.payload }

    // GET CASES
    case actionTypes.GET_DIESEL_PUMP_NAME_PENDING:
      return { ...state, loading: true }
    case actionTypes.GET_DIESEL_PUMP_NAME_SUCCESS:
      return { ...state, loading: false, pumpNames: action.payload }
    case actionTypes.GET_DIESEL_PUMP_NAME_SUCCESS:
      return { ...state, loading: false, error: action.payload }

    // ADD CASES
    case actionTypes.ADD_DIESEL_PENDING:
      return { ...state, loading: true }
    case actionTypes.ADD_DIESEL_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.ADD_DIESEL_FAILURE:
      return { ...state, loading: false }

    // UPLOAD CASES
    case actionTypes.UPLOAD_DIESEL_PENDING:
      return { ...state, loading: true }
    case actionTypes.UPLOAD_DIESEL_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.UPLOAD_DIESEL_FAILURE:
      return { ...state, loading: false }

    // EDIT CASES
    case actionTypes.EDIT_DIESEL_PENDING:
      return { ...state, loading: true }
    case actionTypes.EDIT_DIESEL_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.EDIT_DIESEL_FAILURE:
      return { ...state, loading: false }

    // DELETE CASES
    case actionTypes.DELETE_DIESEL_PENDING:
      return { ...state, loading: true }
    case actionTypes.DELETE_DIESEL_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.DELETE_DIESEL_FAILURE:
      return { ...state, loading: false }

    // DOWNLOAD CASES
    case actionTypes.DOWNLOAD_DIESEL_PENDING:
      return { ...state, downloadLoading: true }
    case actionTypes.DOWNLOAD_DIESEL_SUCCESS:
      return { ...state, downloadLoading: false }
    case actionTypes.DOWNLOAD_DIESEL_FAILURE:
      return { ...state, downloadLoading: false }

    default:
      return state
  }
}
