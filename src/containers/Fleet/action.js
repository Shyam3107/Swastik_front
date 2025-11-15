import * as actionTypes from "./actionTypes";
import { API, makeRequest } from "../../APIs/APIs";
import convertCSVToJson from "../../utils/convertCSVtoJSON";

export const getFleet =
  (params = {}) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.GET_FLEET_PENDING,
      });

      const options = {
        method: "get",
        url: API.GET_FLEET,
        params: params,
        callback: (data) => {
          dispatch({
            type: actionTypes.GET_FLEET_SUCCESS,
            payload: data,
          });
        },
        errorActionType: actionTypes.GET_FLEET_FAILURE,
        dispatch,
      };

      makeRequest(options);
    };

export const getFleetListForTrips =
  (params = {}) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.GET_FLEET_FOR_TRIPS_PENDING,
      });

      const options = {
        method: "get",
        url: API.GET_FLEET_LIST_FOR_TRIPS,
        params: params,
        callback: (data) => {
          dispatch({
            type: actionTypes.GET_FLEET_FOR_TRIPS_SUCCESS,
            payload: data,
          });
        },
        errorActionType: actionTypes.GET_FLEET_FOR_TRIPS_FAILURE,
        dispatch,
      };

      makeRequest(options);
    };

export const addFleet =
  (payload, cb = () => { }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.ADD_FLEET_PENDING,
      });

      const options = {
        method: "post",
        url: API.ADD_FLEET,
        payload: payload,
        callback: (data) => {
          dispatch({
            type: actionTypes.ADD_FLEET_SUCCESS,
          });
          cb();
        },
        errorActionType: actionTypes.ADD_FLEET_FAILURE,
        dispatch,
      };

      makeRequest(options);
    };

export const uploadFleet =
  (payload, cb = () => { }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.UPLOAD_FLEET_PENDING,
      });

      const options = {
        method: "post",
        url: API.UPLOAD_FLEET,
        payload: payload,
        callback: (data) => {
          dispatch({
            type: actionTypes.UPLOAD_FLEET_SUCCESS,
          });
          cb();
        },
        errorActionType: actionTypes.UPLOAD_FLEET_FAILURE,
        dispatch,
      };

      convertCSVToJson(payload, options);
    };

export const editFleet =
  (payload, cb = () => { }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.EDIT_FLEET_PENDING,
      });

      const options = {
        method: "put",
        url: API.EDIT_FLEET,
        payload: payload,
        callback: (data) => {
          dispatch({
            type: actionTypes.EDIT_FLEET_SUCCESS,
          });
          cb();
        },
        errorActionType: actionTypes.EDIT_FLEET_FAILURE,
        dispatch,
      };

      makeRequest(options);
    };

export const deleteFleet =
  (payload, cb = () => { }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.DELETE_FLEET_PENDING,
      });

      const options = {
        method: "delete",
        url: API.DELETE_FLEET,
        payload: payload,
        callback: (data) => {
          dispatch({
            type: actionTypes.DELETE_FLEET_SUCCESS,
          });
          cb();
        },
        errorActionType: actionTypes.DELETE_FLEET_FAILURE,
        dispatch,
      };

      makeRequest(options);
    };

export const downloadFleet =
  (params = {}) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.DOWNLOAD_FLEET_PENDING,
      });

      const options = {
        method: "file",
        url: API.DOWNLOAD_FLEET,
        params: params,
        callback: () => {
          dispatch({
            type: actionTypes.DOWNLOAD_FLEET_SUCCESS,
          });
        },
        errorActionType: actionTypes.DOWNLOAD_FLEET_FAILURE,
        dispatch,
      };

      makeRequest(options);
    };

export const completeVehicleNum =
  (payload, cb = () => { }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.COMPLETE_VEHICLE_NUMBER_PENDING,
      });

      const options = {
        method: "postFile",
        url: API.COMPLETE_VEHICLE_NUMBER,
        payload: payload,
        callback: (data) => {
          dispatch({
            type: actionTypes.COMPLETE_VEHICLE_NUMBER_SUCCESS,
          });
          cb();
        },
        errorActionType: actionTypes.COMPLETE_VEHICLE_NUMBER_FAILURE,
        dispatch,
      };

      convertCSVToJson(payload, options);
    };