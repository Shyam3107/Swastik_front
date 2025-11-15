import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  driverHistory: null,
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // GET CASES
    case actionTypes.GET_DRIVER_HISTORY_PENDING:
      return { ...initialState, loading: true };
    case actionTypes.GET_DRIVER_HISTORY_SUCCESS:
      return {
        ...initialState,
        driverHistory: action.payload.data,
      };
    case actionTypes.GET_DRIVER_HISTORY_FAILURE:
      return {
        ...initialState,
        error: action.payload,
      };

    // ADD CASES
    case actionTypes.ADD_DRIVER_HISTORY_PENDING:
      return { ...state, loading: true };
    case actionTypes.ADD_DRIVER_HISTORY_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.ADD_DRIVER_HISTORY_FAILURE:
      return { ...state, loading: false };

    // EDIT CASES
    case actionTypes.EDIT_DRIVER_HISTORY_PENDING:
      return { ...state, loading: true };
    case actionTypes.EDIT_DRIVER_HISTORY_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.EDIT_DRIVER_HISTORY_FAILURE:
      return { ...state, loading: false };

    // DELETE CASES
    case actionTypes.DELETE_DRIVER_HISTORY_PENDING:
      return { ...state, loading: true };
    case actionTypes.DELETE_DRIVER_HISTORY_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.DELETE_DRIVER_HISTORY_FAILURE:
      return { ...state, loading: false };

    // DOWNLOAD CASES
    case actionTypes.DOWNLOAD_DRIVER_HISTORY_PENDING:
      return { ...state, downloadLoading: true };
    case actionTypes.DOWNLOAD_DRIVER_HISTORY_SUCCESS:
      return { ...state, downloadLoading: false };
    case actionTypes.DOWNLOAD_DRIVER_HISTORY_FAILURE:
      return { ...state, downloadLoading: false };

    default:
      return state;
  }
}
