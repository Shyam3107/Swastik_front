import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  trips: null,
  error: null,
  downloadLoading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // GET CASES
    case actionTypes.GET_TRIPS_PENDING:
      return { ...state, loading: true };
    case actionTypes.GET_TRIPS_SUCCESS:
      return { ...state, loading: false, trips: action.payload.data };
    case actionTypes.GET_TRIPS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ADD CASES
    case actionTypes.ADD_TRIPS_PENDING:
      return { ...state, loading: true };
    case actionTypes.ADD_TRIPS_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.ADD_TRIPS_FAILURE:
      return { ...state, loading: false };

    // UPLOAD CASES
    case actionTypes.UPLOAD_TRIPS_PENDING:
      return { ...state, loading: true };
    case actionTypes.UPLOAD_TRIPS_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.UPLOAD_TRIPS_FAILURE:
      return { ...state, loading: false };

    // UPLOAD RATE CASES
    case actionTypes.UPLOAD_RATES_PENDING:
      return { ...state, loading: true };
    case actionTypes.UPLOAD_RATES_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.UPLOAD_RATES_FAILURE:
      return { ...state, loading: false };

    // EDIT CASES
    case actionTypes.EDIT_TRIPS_PENDING:
      return { ...state, loading: true };
    case actionTypes.EDIT_TRIPS_SUCCESS:
      return { ...state, trips: null, loading: false };
    case actionTypes.EDIT_TRIPS_FAILURE:
      return { ...state, loading: false };

    // DELETE CASES
    case actionTypes.DELETE_TRIPS_PENDING:
      return { ...state, loading: true };
    case actionTypes.DELETE_TRIPS_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.DELETE_TRIPS_FAILURE:
      return { ...state, loading: false };

    // DOWNLOAD CASES
    case actionTypes.DOWNLOAD_TRIPS_PENDING:
      return { ...state, downloadLoading: true };
    case actionTypes.DOWNLOAD_TRIPS_SUCCESS:
      return { ...state, downloadLoading: false };
    case actionTypes.DOWNLOAD_TRIPS_FAILURE:
      return { ...state, downloadLoading: false };

    default:
      return state;
  }
}
