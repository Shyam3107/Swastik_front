import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  expenses: null,
  error: null,
  downloadLoading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_VEHICLES_EXPENSE_PENDING:
      return { ...initialState, loading: true };
    case actionTypes.GET_VEHICLES_EXPENSE_SUCCESS:
      return { ...initialState, expenses: action.payload };
    case actionTypes.GET_VEHICLES_EXPENSE_FAILURE:
      return { ...initialState, error: action.payload };

    case actionTypes.ADD_VEHICLES_EXPENSE_PENDING:
      return { ...state, loading: true };
    case actionTypes.ADD_VEHICLES_EXPENSE_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.ADD_VEHICLES_EXPENSE_FAILURE:
      return { ...state, loading: false };

    case actionTypes.UPLOAD_VEHICLES_EXPENSE_PENDING:
      return { ...state, loading: true };
    case actionTypes.UPLOAD_VEHICLES_EXPENSE_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.UPLOAD_VEHICLES_EXPENSE_FAILURE:
      return { ...state, loading: false };

    case actionTypes.EDIT_VEHICLES_EXPENSE_PENDING:
      return { ...state, loading: true };
    case actionTypes.EDIT_VEHICLES_EXPENSE_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.EDIT_VEHICLES_EXPENSE_FAILURE:
      return { ...state, loading: false };

    case actionTypes.DELETE_VEHICLES_EXPENSE_PENDING:
      return { ...state, loading: true };
    case actionTypes.DELETE_VEHICLES_EXPENSE_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.DELETE_VEHICLES_EXPENSE_FAILURE:
      return { ...state, loading: false };

    case actionTypes.DOWNLOAD_VEHICLES_EXPENSE_PENDING:
      return { ...state, downloadLoading: true };
    case actionTypes.DOWNLOAD_VEHICLES_EXPENSE_SUCCESS:
      return { ...state, downloadLoading: false };
    case actionTypes.DOWNLOAD_VEHICLES_EXPENSE_FAILURE:
      return { ...state, downloadLoading: false };

    default:
      return state;
  }
}
