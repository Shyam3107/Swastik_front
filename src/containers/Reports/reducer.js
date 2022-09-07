import * as actionTypes from "./actionTypes"

const initialState = {
  loading: false,
  error: null,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // Vehicle Reports
    case actionTypes.GET_REPORTS_PENDING:
      return { ...initialState, loading: true }
    case actionTypes.GET_REPORTS_SUCCESS:
      return { ...initialState }
    case actionTypes.GET_REPORTS_FAILURE:
      return { ...initialState, error: action.payload }

    default:
      return state
  }
}
