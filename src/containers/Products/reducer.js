import * as actionTypes from "./actionTypes"

const initialState = {
  loading: false,
  products: null,
  productsName: null,
  error: null,
  downloadLoading: false,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // GET CASES
    case actionTypes.GET_PRODUCTS_PENDING:
      return { ...initialState, loading: true }
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...initialState,
        products: action.payload.data,
      }
    case actionTypes.GET_PRODUCTS_FAILURE:
      return { ...initialState, error: action.payload }

    // GET NAME CASES
    case actionTypes.GET_PRODUCTS_NAME_PENDING:
      return { ...initialState, loading: true }
    case actionTypes.GET_PRODUCTS_NAME_SUCCESS:
      return {
        ...initialState,
        productsName: action.payload.data,
      }
    case actionTypes.GET_PRODUCTS_NAME_FAILURE:
      return { ...initialState, error: action.payload }

    // ADD CASES
    case actionTypes.ADD_PRODUCTS_PENDING:
      return { ...state, loading: true }
    case actionTypes.ADD_PRODUCTS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.ADD_PRODUCTS_FAILURE:
      return { ...state, loading: false }

    // UPLOAD CASES
    case actionTypes.UPLOAD_PRODUCTS_PENDING:
      return { ...state, loading: true }
    case actionTypes.UPLOAD_PRODUCTS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.UPLOAD_PRODUCTS_FAILURE:
      return { ...state, loading: false }

    // EDIT CASES
    case actionTypes.EDIT_PRODUCTS_PENDING:
      return { ...state, loading: true }
    case actionTypes.EDIT_PRODUCTS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.EDIT_PRODUCTS_FAILURE:
      return { ...state, loading: false }

    // DELETE CASES
    case actionTypes.DELETE_PRODUCTS_PENDING:
      return { ...state, loading: true }
    case actionTypes.DELETE_PRODUCTS_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.DELETE_PRODUCTS_FAILURE:
      return { ...state, loading: false }

    // DOWNLOAD CASES
    case actionTypes.DOWNLOAD_PRODUCTS_PENDING:
      return { ...state, downloadLoading: true }
    case actionTypes.DOWNLOAD_PRODUCTS_SUCCESS:
      return { ...state, downloadLoading: false }
    case actionTypes.DOWNLOAD_PRODUCTS_FAILURE:
      return { ...state, downloadLoading: false }

    // DOWNLOAD BY ID CASES
    case actionTypes.DOWNLOAD_PRODUCTS_BY_ID_PENDING:
      return { ...state, downloadLoading: true }
    case actionTypes.DOWNLOAD_PRODUCTS_BY_ID_SUCCESS:
      return { ...state, downloadLoading: false }
    case actionTypes.DOWNLOAD_PRODUCTS_BY_ID_FAILURE:
      return { ...state, downloadLoading: false }

    default:
      return state
  }
}
