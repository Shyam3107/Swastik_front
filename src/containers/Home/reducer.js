import * as actionTypes from "./actionTypes"

const initialState = {
  loading: false,
  home: null,
  error: null,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_HOME_PENDING:
      return { ...initialState, loading: true }
    case actionTypes.GET_HOME_SUCCESS:
      return { ...initialState, home: action.payload }
    case actionTypes.GET_HOME_FAILURE:
      return { ...initialState, error: action.payload }

    default:
      return state
  }
}
