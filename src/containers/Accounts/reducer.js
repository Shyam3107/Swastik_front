import * as actionTypes from "./actionTypes"

const initialState = {
  loading: false,
  accounts: null,
  error: null,
  addLoading: false,
  editLoading: false,
  deleteLoading: false,
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
      return { ...state, addLoading: true }
    case actionTypes.ADD_ACCOUNTS_SUCCESS:
      return { ...state, addLoading: false }
    case actionTypes.ADD_ACCOUNTS_FAILURE:
      return { ...state, addLoading: false }

    case actionTypes.EDIT_ACCOUNTS_PENDING:
      return { ...state, editLoading: true }
    case actionTypes.EDIT_ACCOUNTS_SUCCESS:
      return { ...state, editLoading: false }
    case actionTypes.EDIT_ACCOUNTS_FAILURE:
      return { ...state, editLoading: false }

    case actionTypes.DELETE_ACCOUNTS_PENDING:
      return { ...state, deleteLoading: true }
    case actionTypes.DELETE_ACCOUNTS_SUCCESS:
      return { ...state, deleteLoading: false }
    case actionTypes.DELETE_ACCOUNTS_FAILURE:
      return { ...state, deleteLoading: false }

    default:
      return state
  }
}
