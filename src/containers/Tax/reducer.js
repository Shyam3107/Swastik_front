import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  tax: null,
  error: null,
  addLoading: false,
  editLoading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_TAX_PENDING:
      return { ...initialState, loading: true };
    case actionTypes.GET_TAX_SUCCESS:
      return { ...initialState, attendance: action.payload };
    case actionTypes.GET_TAX_FAILURE:
      return { ...initialState, error: action.payload };
    case actionTypes.ADD_TAX_PENDING:
      return { ...state, addLoading: true };
    case actionTypes.ADD_TAX_SUCCESS:
      return { ...state, addLoading: false };
    case actionTypes.ADD_TAX_FAILURE:
      return { ...state, addLoading: false };
    case actionTypes.EDIT_TAX_PENDING:
      return { ...state, editLoading: true };
    case actionTypes.EDIT_TAX_SUCCESS:
      return { ...state, editLoading: false };
    case actionTypes.EDIT_TAX_FAILURE:
      return { ...state, editLoading: false };
    default:
      return state;
  }
}
