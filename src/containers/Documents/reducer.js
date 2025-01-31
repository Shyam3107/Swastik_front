import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  documents: null,
  error: null,
  downloadLoading: false,
  documentsLink: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // GET CASES
    case actionTypes.GET_DOCUMENTS_PENDING:
      return { ...initialState, loading: true };
    case actionTypes.GET_DOCUMENTS_SUCCESS:
      return {
        ...initialState,
        documents: action.payload.data,
        documentsLink: action.payload.documentsLink,
      };
    case actionTypes.GET_DOCUMENTS_FAILURE:
      return { ...initialState, error: action.payload };

    // ADD CASES
    case actionTypes.ADD_DOCUMENTS_PENDING:
      return { ...state, loading: true };
    case actionTypes.ADD_DOCUMENTS_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.ADD_DOCUMENTS_FAILURE:
      return { ...state, loading: false };

    // UPLOAD CASES
    case actionTypes.UPLOAD_DOCUMENTS_PENDING:
      return { ...state, loading: true };
    case actionTypes.UPLOAD_DOCUMENTS_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.UPLOAD_DOCUMENTS_FAILURE:
      return { ...state, loading: false };

    // EDIT CASES
    case actionTypes.EDIT_DOCUMENTS_PENDING:
      return { ...state, loading: true };
    case actionTypes.EDIT_DOCUMENTS_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.EDIT_DOCUMENTS_FAILURE:
      return { ...state, loading: false };

    // DELETE CASES
    case actionTypes.DELETE_DOCUMENTS_PENDING:
      return { ...state, loading: true };
    case actionTypes.DELETE_DOCUMENTS_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.DELETE_DOCUMENTS_FAILURE:
      return { ...state, loading: false };

    // DOWNLOAD CASES
    case actionTypes.DOWNLOAD_DOCUMENTS_PENDING:
      return { ...state, downloadLoading: true };
    case actionTypes.DOWNLOAD_DOCUMENTS_SUCCESS:
      return { ...state, downloadLoading: false };
    case actionTypes.DOWNLOAD_DOCUMENTS_FAILURE:
      return { ...state, downloadLoading: false };

    // DOWNLOAD MISSING DOCS CASES
    case actionTypes.DOWNLOAD_MISSING_DOCUMENTS_PENDING:
      return { ...state, downloadLoading: true };
    case actionTypes.DOWNLOAD_MISSING_DOCUMENTS_SUCCESS:
      return { ...state, downloadLoading: false };
    case actionTypes.DOWNLOAD_MISSING_DOCUMENTS_FAILURE:
      return { ...state, downloadLoading: false };

    // COMPLETING THE VEHICLE NUMBER
    case actionTypes.COMPLETE_VEHICLE_NUMBER_PENDING:
      return { ...state, loading: true };
    case actionTypes.COMPLETE_VEHICLE_NUMBER_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.COMPLETE_VEHICLE_NUMBER_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
}
