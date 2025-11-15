import * as actionTypes from "./actionTypes";
import { API, makeRequest } from "../../APIs/APIs";

export const getDriverHistory =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_DRIVER_HISTORY_PENDING,
    });

    const options = {
      method: "get",
      url: API.GET_DRIVER_HISTORY,
      params: params,
      callback: (data) => {
        dispatch({
          type: actionTypes.GET_DRIVER_HISTORY_SUCCESS,
          payload: data,
        });
      },
      errorActionType: actionTypes.GET_DRIVER_HISTORY_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const addDriverHistory =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.ADD_DRIVER_HISTORY_PENDING,
    });

    const options = {
      method: "post",
      url: API.ADD_DRIVER_HISTORY,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.ADD_DRIVER_HISTORY_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.ADD_DRIVER_HISTORY_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const editDriverHistory =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.EDIT_DRIVER_HISTORY_PENDING,
    });

    const options = {
      method: "put",
      url: API.EDIT_DRIVER_HISTORY,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.EDIT_DRIVER_HISTORY_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.EDIT_DRIVER_HISTORY_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const deleteDriverHistory =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_DRIVER_HISTORY_PENDING,
    });

    const options = {
      method: "delete",
      url: API.DELETE_DRIVER_HISTORY,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.DELETE_DRIVER_HISTORY_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.DELETE_DRIVER_HISTORY_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const downloadDriverHistory =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DOWNLOAD_DRIVER_HISTORY_PENDING,
    });

    const options = {
      method: "file",
      url: API.DOWNLOAD_DRIVER_HISTORY,
      params: params,
      callback: () => {
        dispatch({
          type: actionTypes.DOWNLOAD_DRIVER_HISTORY_SUCCESS,
        });
      },
      errorActionType: actionTypes.DOWNLOAD_DRIVER_HISTORY_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

