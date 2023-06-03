import * as actionTypes from "./actionTypes"

const initialState = {
  loading: false,
  downloadLoading: false,
  report: null,
  error: null,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // Get Vehicle Reports
    case actionTypes.GET_REPORTS_PENDING:
      return { ...initialState, loading: true }
    case actionTypes.GET_REPORTS_SUCCESS:
      return { ...initialState, report: action.payload }
    case actionTypes.GET_REPORTS_FAILURE:
      return { ...initialState, error: action.payload }

    // Download Vehicle Reports
    case actionTypes.DOWNLOAD_REPORTS_PENDING:
      return { ...state, downloadLoading: true }
    case actionTypes.DOWNLOAD_REPORTS_SUCCESS:
      return { ...state, downloadLoading: false }
    case actionTypes.DOWNLOAD_REPORTS_FAILURE:
      return { ...state, downloadLoading: false, error: action.payload }


    default:
      return state
  }
}
