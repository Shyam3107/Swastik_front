import * as actionTypes from "./actionTypes"

const initialState = {
  loading: false,
  accounts: null,
  error: null,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_ACCOUNTS_PENDING:
      return { ...initialState, loading: true }
    case actionTypes.GET_ACCOUNTS_SUCCESS:
      return { ...initialState, accounts: action.payload }
    case actionTypes.GET_ACCOUNTS_FAILURE:
      return { ...initialState, error: action.payload }

    case actionTypes.ADD_ACCOUNTS_PENDING:
      return { ...state, loading: true }
    case actionTypes.ADD_ACCOUNTS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.ADD_ACCOUNTS_FAILURE:
      return { ...state, loading: false }

    case actionTypes.EDIT_ACCOUNTS_PENDING:
      return { ...state, loading: true }
    case actionTypes.EDIT_ACCOUNTS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.EDIT_ACCOUNTS_FAILURE:
      return { ...state, loading: false }

    case actionTypes.DELETE_ACCOUNTS_PENDING:
      return { ...state, loading: true }
    case actionTypes.DELETE_ACCOUNTS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.DELETE_ACCOUNTS_FAILURE:
      return { ...state, loading: false }

    default:
      return state
  }
}
