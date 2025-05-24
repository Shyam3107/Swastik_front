import * as actionTypes from "./actionTypes";
import { API, makeRequest } from "../../APIs/APIs";
import convertCSVToJson from "../../utils/convertCSVtoJSON";

export const getDrivers =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_DRIVERS_PENDING,
    });

    const options = {
      method: "get",
      url: API.GET_DRIVERS,
      params: params,
      callback: (data) => {
        dispatch({
          type: actionTypes.GET_DRIVERS_SUCCESS,
          payload: data,
        });
      },
      errorActionType: actionTypes.GET_DRIVERS_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const addDriver =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.ADD_DRIVER_PENDING,
    });

    const options = {
      method: "post",
      url: API.ADD_DRIVER,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.ADD_DRIVER_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.ADD_DRIVER_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const uploadDriver =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.UPLOAD_DRIVER_PENDING,
    });

    const options = {
      method: "post",
      url: API.UPLOAD_DRIVERS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.UPLOAD_DRIVER_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.UPLOAD_DRIVER_FAILURE,
      dispatch,
    };

    convertCSVToJson(payload, options);
  };

export const editDriver =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.EDIT_DRIVER_PENDING,
    });

    const options = {
      method: "put",
      url: API.EDIT_DRIVER,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.EDIT_DRIVER_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.EDIT_DRIVER_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const deleteDriver =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_DRIVER_PENDING,
    });

    const options = {
      method: "delete",
      url: API.DELETE_DRIVER,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.DELETE_DRIVER_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.DELETE_DRIVER_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const downloadDrivers =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DOWNLOAD_DRIVER_PENDING,
    });

    const options = {
      method: "file",
      url: API.DOWNLOAD_DRIVER,
      params: params,
      callback: () => {
        dispatch({
          type: actionTypes.DOWNLOAD_DRIVER_SUCCESS,
        });
      },
      errorActionType: actionTypes.DOWNLOAD_DRIVER_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };
