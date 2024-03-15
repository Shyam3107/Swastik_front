import * as actionTypes from "./actionTypes"
import { API, makeRequest } from "../../APIs/APIs"
import convertCSVToJson from "../../utils/convertCSVtoJSON"

export const getTrips =
  (params = {}) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.GET_TRIPS_PENDING,
      })

      const options = {
        method: "get",
        url: params.url ?? API.GET_TRIPS,
        params: params,
        callback: (data) => {
          dispatch({
            type: actionTypes.GET_TRIPS_SUCCESS,
            payload: data,
          })
        },
        errorActionType: actionTypes.GET_TRIPS_FAILURE,
        dispatch,
      }

      makeRequest(options)
    }

export const addTrips =
  (payload, cb = () => { }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.ADD_TRIPS_PENDING,
      })

      const options = {
        method: "post",
        url: API.ADD_TRIPS,
        payload: payload,
        callback: (data) => {
          dispatch({
            type: actionTypes.ADD_TRIPS_SUCCESS,
          })
          cb()
        },
        errorActionType: actionTypes.ADD_TRIPS_FAILURE,
        dispatch,
      }

      makeRequest(options)
    }

export const uploadTrips =
  (payload, cb = () => { }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.UPLOAD_TRIPS_PENDING,
      })

      const options = {
        method: "post",
        url: API.UPLOAD_TRIPS,
        payload: payload,
        callback: (data) => {
          dispatch({
            type: actionTypes.UPLOAD_TRIPS_SUCCESS,
          })
          cb()
        },
        errorActionType: actionTypes.UPLOAD_TRIPS_FAILURE,
        dispatch,
      }

      convertCSVToJson(payload, options)
    }

export const uploadRates =
  (payload, cb = () => { }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.UPLOAD_RATES_PENDING,
      })

      const options = {
        method: "postFile",
        url: API.UPLOAD_TRIPS_RATES,
        payload: payload,
        callback: (data) => {
          dispatch({
            type: actionTypes.UPLOAD_RATES_SUCCESS,
          })
          cb()
        },
        errorActionType: actionTypes.UPLOAD_RATES_FAILURE,
        dispatch,
      }

      convertCSVToJson(payload, options)
    }

export const editTrips =
  (payload, cb = () => { }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.EDIT_TRIPS_PENDING,
      })

      const options = {
        method: "put",
        url: API.EDIT_TRIPS,
        payload: payload,
        callback: (data) => {
          dispatch({
            type: actionTypes.EDIT_TRIPS_SUCCESS,
          })
          cb()
        },
        errorActionType: actionTypes.EDIT_TRIPS_FAILURE,
        dispatch,
      }

      makeRequest(options)
    }

export const deleteTrips =
  (payload, cb = () => { }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.DELETE_TRIPS_PENDING,
      })

      const options = {
        method: "delete",
        url: API.DELETE_TRIPS,
        payload: payload,
        callback: (data) => {
          dispatch({
            type: actionTypes.DELETE_TRIPS_SUCCESS,
          })
          cb()
        },
        errorActionType: actionTypes.DELETE_TRIPS_FAILURE,
        dispatch,
      }

      makeRequest(options)
    }

export const downloadTrips =
  (params = {}) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.DOWNLOAD_TRIPS_PENDING,
      })

      const options = {
        method: "file",
        url: params.url ?? API.DOWNLOAD_TRIPS,
        params: params,
        callback: () => {
          dispatch({
            type: actionTypes.DOWNLOAD_TRIPS_SUCCESS,
          })
        },
        errorActionType: actionTypes.DOWNLOAD_TRIPS_FAILURE,
        dispatch,
      }

      makeRequest(options)
    }
