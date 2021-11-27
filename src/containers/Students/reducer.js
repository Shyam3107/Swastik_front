import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  students: null,
  error: null,
  addLoading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_STUDENTS_PENDING:
      return { ...initialState, loading: true };
    case actionTypes.GET_STUDENTS_SUCCESS:
      return { ...initialState, students: action.payload };
    case actionTypes.GET_STUDENTS_FAILURE:
      return { ...initialState, error: action.payload };
    case actionTypes.ADD_STUDENTS_PENDING:
      return { ...state, addLoading: true };
    case actionTypes.ADD_STUDENTS_SUCCESS:
      return { ...state, addLoading: false };
    case actionTypes.ADD_STUDENTS_FAILURE:
      return { ...state, addLoading: false };
    default:
      return state;
  }
}
