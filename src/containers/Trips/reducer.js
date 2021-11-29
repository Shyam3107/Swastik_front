import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  trips: null,
  error: null,
  addLoading: false,
  editLoading: false,
  deleteLoading: false,
  uploadLoading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_TRIPS_PENDING:
      return { ...initialState, loading: true };
    case actionTypes.GET_TRIPS_SUCCESS:
      return { ...initialState, trips: action.payload };
    case actionTypes.GET_TRIPS_FAILURE:
      return { ...initialState, error: action.payload };

    case actionTypes.ADD_TRIPS_PENDING:
      return { ...state, addLoading: true };
    case actionTypes.ADD_TRIPS_SUCCESS:
      return { ...state, addLoading: false };
    case actionTypes.ADD_TRIPS_FAILURE:
      return { ...state, addLoading: false };

    case actionTypes.UPLOAD_TRIPS_PENDING:
      return { ...state, uploadingLoading: true };
    case actionTypes.UPLOAD_TRIPS_SUCCESS:
      return { ...state, uploadingLoading: false };
    case actionTypes.UPLOAD_TRIPS_FAILURE:
      return { ...state, uploadingLoading: false };

    case actionTypes.EDIT_TRIPS_PENDING:
      return { ...state, editLoading: true };
    case actionTypes.EDIT_TRIPS_SUCCESS:
      return { ...state, editLoading: false };
    case actionTypes.EDIT_TRIPS_FAILURE:
      return { ...state, editLoading: false };

    case actionTypes.DELETE_TRIPS_PENDING:
      return { ...state, deleteLoading: true };
    case actionTypes.DELETE_TRIPS_SUCCESS:
      return { ...state, deleteLoading: false };
    case actionTypes.DELETE_TRIPS_FAILURE:
      return { ...state, deleteLoading: false };

    default:
      return state;
  }
}
