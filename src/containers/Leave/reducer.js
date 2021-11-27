import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  leave: null,
  error: null,
  addLoading: false,
  editLoading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_LEAVE_PENDING:
      return { ...initialState, loading: true };
    case actionTypes.GET_LEAVE_SUCCESS:
      return { ...initialState, leave: action.payload };
    case actionTypes.GET_LEAVE_FAILURE:
      return { ...initialState, error: action.payload };
    case actionTypes.ADD_LEAVE_PENDING:
      return { ...state, addLoading: true };
    case actionTypes.ADD_LEAVE_SUCCESS:
      return { ...state, addLoading: false };
    case actionTypes.ADD_LEAVE_FAILURE:
      return { ...state, addLoading: false };
    case actionTypes.EDIT_LEAVE_PENDING:
      return { ...state, editLoading: true };
    case actionTypes.EDIT_LEAVE_SUCCESS:
      return { ...state, editLoading: false };
    case actionTypes.EDIT_LEAVE_FAILURE:
      return { ...state, editLoading: false };
    default:
      return state;
  }
}
