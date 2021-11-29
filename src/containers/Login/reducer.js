import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
  loggedIn: Boolean(localStorage.getItem("token")),
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.LOGIN_PENDING:
      return { ...initialState, loading: true };
    case actionTypes.LOGIN_SUCCESS:
      return { ...initialState, ...action.payload, loggedIn: true };
    case actionTypes.LOGIN_FAILURE:
      return { ...initialState, error: action.payload };
    case actionTypes.LOGOUT: {
      return { ...initialState, user: null, token: null, loggedIn: false };
    }
    default:
      return state;
  }
}
