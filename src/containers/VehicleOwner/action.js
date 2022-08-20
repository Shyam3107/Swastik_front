import * as actionTypes from "./actionTypes"
import { API, makeRequest } from "../../APIs/APIs"
import convertCSVToJson from "../../utils/convertCSVtoJSON"

export const getVehicleOwner =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_VEHICLE_OWNER_PENDING,
    })

    const options = {
      method: "get",
      url: API.GET_VEHICLE_OWNER,
      params: params,
      callback: (data) => {
        dispatch({
          type: actionTypes.GET_VEHICLE_OWNER_SUCCESS,
          payload: data,
        })
      },
      errorActionType: actionTypes.GET_VEHICLE_OWNER_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const addVehicleOwner =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.ADD_VEHICLE_OWNER_PENDING,
    })

    const options = {
      method: "post",
      url: API.ADD_VEHICLE_OWNER,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.ADD_VEHICLE_OWNER_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.ADD_VEHICLE_OWNER_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const uploadVehicleOwner =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.UPLOAD_VEHICLE_OWNER_PENDING,
    })

    const options = {
      method: "post",
      url: API.UPLOAD_VEHICLE_OWNER,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.UPLOAD_VEHICLE_OWNER_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.UPLOAD_VEHICLE_OWNER_FAILURE,
      dispatch,
    }

    convertCSVToJson(payload, options)
  }

export const editVehicleOwner =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.EDIT_VEHICLE_OWNER_PENDING,
    })

    const options = {
      method: "put",
      url: API.EDIT_VEHICLE_OWNER,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.EDIT_VEHICLE_OWNER_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.EDIT_VEHICLE_OWNER_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const deleteVehicleOwner =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_VEHICLE_OWNER_PENDING,
    })

    const options = {
      method: "delete",
      url: API.DELETE_VEHICLE_OWNER,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.DELETE_VEHICLE_OWNER_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.DELETE_VEHICLE_OWNER_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const downloadVehicleOwner =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DOWNLOAD_VEHICLE_OWNER_PENDING,
    })

    const options = {
      method: "file",
      url: API.DOWNLOAD_VEHICLE_OWNER,
      params: params,
      callback: () => {
        dispatch({
          type: actionTypes.DOWNLOAD_VEHICLE_OWNER_SUCCESS,
        })
      },
      errorActionType: actionTypes.DOWNLOAD_VEHICLE_OWNER_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }
