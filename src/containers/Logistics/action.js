import * as actionTypes from "./actionTypes"
import { API, makeRequest } from "../../APIs/APIs"
import convertCSVToJson from "../../utils/convertCSVtoJSON"

export const getLogistics =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_LOGISTICS_PENDING,
    })

    const options = {
      method: "get",
      url: API.GET_LOGISTICS,
      params: params,
      callback: (data) => {
        dispatch({
          type: actionTypes.GET_LOGISTICS_SUCCESS,
          payload: data,
        })
      },
      errorActionType: actionTypes.GET_LOGISTICS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const addLogistics =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.ADD_LOGISTICS_PENDING,
    })

    const options = {
      method: "post",
      url: API.ADD_LOGISTICS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.ADD_LOGISTICS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.ADD_LOGISTICS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const uploadLogistics =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.UPLOAD_LOGISTICS_PENDING,
    })

    const options = {
      method: "post",
      url: API.UPLOAD_LOGISTICS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.UPLOAD_LOGISTICS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.UPLOAD_LOGISTICS_FAILURE,
      dispatch,
    }

    convertCSVToJson(payload, options)
  }

export const editLogistics =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.EDIT_LOGISTICS_PENDING,
    })

    const options = {
      method: "put",
      url: API.EDIT_LOGISTICS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.EDIT_LOGISTICS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.EDIT_LOGISTICS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const deleteLogistics =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_LOGISTICS_PENDING,
    })

    const options = {
      method: "delete",
      url: API.DELETE_LOGISTICS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.DELETE_LOGISTICS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.DELETE_LOGISTICS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const downloadLogistics =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DOWNLOAD_LOGISTICS_PENDING,
    })

    const options = {
      method: "file",
      url: API.DOWNLOAD_LOGISTICS,
      params: params,
      callback: () => {
        dispatch({
          type: actionTypes.DOWNLOAD_LOGISTICS_SUCCESS,
        })
      },
      errorActionType: actionTypes.DOWNLOAD_LOGISTICS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }
