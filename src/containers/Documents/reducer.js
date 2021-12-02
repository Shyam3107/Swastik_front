import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  documents: null,
  error: null,
  addLoading: false,
  editLoading: false,
  deleteLoading: false,
  uploadLoading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_DOCUMENTS_PENDING:
      return { ...initialState, loading: true };
    case actionTypes.GET_DOCUMENTS_SUCCESS:
      return { ...initialState, documents: action.payload };
    case actionTypes.GET_DOCUMENTS_FAILURE:
      return { ...initialState, error: action.payload };

    case actionTypes.ADD_DOCUMENTS_PENDING:
      return { ...state, addLoading: true };
    case actionTypes.ADD_DOCUMENTS_SUCCESS:
      return { ...state, addLoading: false };
    case actionTypes.ADD_DOCUMENTS_FAILURE:
      return { ...state, addLoading: false };

    case actionTypes.UPLOAD_DOCUMENTS_PENDING:
      return { ...state, uplDOCUMENTSgLoading: true };
    case actionTypes.UPLOAD_DOCUMENTS_SUCCESS:
      return { ...state, uploadingLoading: false };
    case actionTypes.UPLOAD_DOCUMENTS_FAILURE:
      return { ...state, uploadingLoading: false };

    case actionTypes.EDIT_DOCUMENTS_PENDING:
      return { ...state, editLoading: true };
    case actionTypes.EDIT_DOCUMENTS_SUCCESS:
      return { ...state, editLoading: false };
    case actionTypes.EDIT_DOCUMENTS_FAILURE:
      return { ...state, editLoading: false };

    case actionTypes.DELETE_DOCUMENTS_PENDING:
      return { ...state, deleteLoading: true };
    case actionTypes.DELETE_DOCUMENTS_SUCCESS:
      return { ...state, deleteLoading: false };
    case actionTypes.DELETE_DOCUMENTS_FAILURE:
      return { ...state, deleteLoading: false };

    default:
      return state;
  }
}
