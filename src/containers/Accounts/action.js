import * as actionTypes from "./actionTypes";
import { API, makeRequest } from "../../APIs/APIs";

export const getAccount =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_ACCOUNTS_PENDING,
    });

    const options = {
      method: "get",
      url: API.GET_ACCOUNTS,
      params: params,
      callback: (data) => {
        dispatch({
          type: actionTypes.GET_ACCOUNTS_SUCCESS,
          payload: data.data,
        });
      },
      errorActionType: actionTypes.GET_ACCOUNTS_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const addAccount =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.ADD_ACCOUNTS_PENDING,
    });

    const options = {
      method: "post",
      url: API.ADD_ACCOUNTS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.ADD_ACCOUNTS_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.ADD_ACCOUNTS_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const editAccount =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.EDIT_ACCOUNTS_PENDING,
    });

    const options = {
      method: "put",
      url: API.EDIT_ACCOUNTS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.EDIT_ACCOUNTS_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.EDIT_ACCOUNTS_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const deleteAccount =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_ACCOUNTS_PENDING,
    });

    const options = {
      method: "delete",
      url: API.DELETE_ACCOUNTS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.DELETE_ACCOUNTS_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.DELETE_ACCOUNTS_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };
