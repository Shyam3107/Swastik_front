import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  drivers: null,
  error: null,
  guarantors: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // GET CASES
    case actionTypes.GET_DRIVERS_PENDING:
      return { ...initialState, guarantors: state.guarantors, loading: true };
    case actionTypes.GET_DRIVERS_SUCCESS:
      return {
        ...initialState,
        guarantors: state.guarantors,
        drivers: action.payload.data,
      };
    case actionTypes.GET_DRIVERS_FAILURE:
      return {
        ...initialState,
        guarantors: state.guarantors,
        error: action.payload,
      };

    case actionTypes.GET_GUARANTORS_PENDING:
      return { ...initialState, loading: true, drivers: state.drivers };
    case actionTypes.GET_GUARANTORS_SUCCESS:
      return {
        ...initialState,
        guarantors: action.payload.data,
        drivers: state.drivers,
      };
    case actionTypes.GET_GUARANTORS_FAILURE:
      return { ...initialState, error: action.payload, drivers: state.drivers };

    // ADD CASES
    case actionTypes.ADD_DRIVER_PENDING:
      return { ...state, loading: true };
    case actionTypes.ADD_DRIVER_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.ADD_DRIVER_FAILURE:
      return { ...state, loading: false };

    // UPLOAD CASES
    case actionTypes.UPLOAD_DRIVER_PENDING:
      return { ...state, loading: true };
    case actionTypes.UPLOAD_DRIVER_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.UPLOAD_DRIVER_FAILURE:
      return { ...state, loading: false };

    // EDIT CASES
    case actionTypes.EDIT_DRIVER_PENDING:
      return { ...state, loading: true };
    case actionTypes.EDIT_DRIVER_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.EDIT_DRIVER_FAILURE:
      return { ...state, loading: false };

    // DELETE CASES
    case actionTypes.DELETE_DRIVER_PENDING:
      return { ...state, loading: true };
    case actionTypes.DELETE_DRIVER_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.DELETE_DRIVER_FAILURE:
      return { ...state, loading: false };

    // DOWNLOAD CASES
    case actionTypes.DOWNLOAD_DRIVER_PENDING:
      return { ...state, downloadLoading: true };
    case actionTypes.DOWNLOAD_DRIVER_SUCCESS:
      return { ...state, downloadLoading: false };
    case actionTypes.DOWNLOAD_DRIVER_FAILURE:
      return { ...state, downloadLoading: false };

    default:
      return state;
  }
}
