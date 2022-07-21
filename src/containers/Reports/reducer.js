import * as actionTypes from "./actionTypes"

const initialState = {
  loading: false,
  error: null,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_VEHICLES_REPORTS_PENDING:
      return { ...initialState, loading: true }
    case actionTypes.GET_VEHICLES_REPORTS_SUCCESS:
      return { ...initialState, vehicleReports: action.payload }
    case actionTypes.GET_VEHICLES_REPORTS_FAILURE:
      return { ...initialState, error: action.payload }

    case actionTypes.GET_DIESELS_REPORTS_PENDING:
      return { ...initialState, loading: true }
    case actionTypes.GET_DIESELS_REPORTS_SUCCESS:
      return { ...initialState, vehicleReports: action.payload }
    case actionTypes.GET_DIESELS_REPORTS_FAILURE:
      return { ...initialState, error: action.payload }

    default:
      return state
  }
}
