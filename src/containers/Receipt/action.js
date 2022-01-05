import * as actionTypes from "./actionTypes";
import { API, makeRequest } from "../../APIs/APIs";

export const getReceipt =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_RECEIPT_PENDING,
    });

    const options = {
      method: "get",
      url: API.GET_RECEIPT,
      params: params,
      callback: (data) => {
        dispatch({
          type: actionTypes.GET_RECEIPT_SUCCESS,
          payload: data.data,
        });
      },
      errorActionType: actionTypes.GET_RECEIPT_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const addReceipt =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.ADD_RECEIPT_PENDING,
    });

    const options = {
      method: "post",
      url: API.ADD_RECEIPT,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.ADD_RECEIPT_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.ADD_RECEIPT_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const editReceipt =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.EDIT_RECEIPT_PENDING,
    });

    const options = {
      method: "put",
      url: API.EDIT_RECEIPT,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.EDIT_RECEIPT_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.EDIT_RECEIPT_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const deleteReceipt =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_RECEIPT_PENDING,
    });

    const options = {
      method: "delete",
      url: API.DELETE_RECEIPT,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.DELETE_RECEIPT_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.DELETE_RECEIPT_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };
