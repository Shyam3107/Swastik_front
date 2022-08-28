import * as actionTypes from "./actionTypes"
import { API, makeRequest } from "../../APIs/APIs"
import convertCSVToJson from "../../utils/convertCSVtoJSON"

export const getBills =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_HARDWARE_SHOPS_BILLS_PENDING,
    })

    const options = {
      method: "get",
      url: API.GET_HARDWARE_SHOPS_BILLS,
      params: params,
      callback: (data) => {
        dispatch({
          type: actionTypes.GET_HARDWARE_SHOPS_BILLS_SUCCESS,
          payload: data,
        })
      },
      errorActionType: actionTypes.GET_HARDWARE_SHOPS_BILLS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const addBills =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.ADD_HARDWARE_SHOPS_BILLS_PENDING,
    })

    const options = {
      method: "post",
      url: API.ADD_HARDWARE_SHOPS_BILLS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.ADD_HARDWARE_SHOPS_BILLS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.ADD_HARDWARE_SHOPS_BILLS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const uploadBills =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.UPLOAD_HARDWARE_SHOPS_BILLS_PENDING,
    })

    const options = {
      method: "post",
      url: API.UPLOAD_HARDWARE_SHOPS_BILLS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.UPLOAD_HARDWARE_SHOPS_BILLS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.UPLOAD_HARDWARE_SHOPS_BILLS_FAILURE,
      dispatch,
    }

    convertCSVToJson(payload, options)
  }

export const editBills =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.EDIT_HARDWARE_SHOPS_BILLS_PENDING,
    })

    const options = {
      method: "put",
      url: API.EDIT_HARDWARE_SHOPS_BILLS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.EDIT_HARDWARE_SHOPS_BILLS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.EDIT_HARDWARE_SHOPS_BILLS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const deleteBills =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_HARDWARE_SHOPS_BILLS_PENDING,
    })

    const options = {
      method: "delete",
      url: API.DELETE_HARDWARE_SHOPS_BILLS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.DELETE_HARDWARE_SHOPS_BILLS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.DELETE_HARDWARE_SHOPS_BILLS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const downloadBills =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DOWNLOAD_HARDWARE_SHOPS_BILLS_PENDING,
    })

    const options = {
      method: "file",
      url: API.DOWNLOAD_HARDWARE_SHOPS_BILLS,
      params: params,
      callback: () => {
        dispatch({
          type: actionTypes.DOWNLOAD_HARDWARE_SHOPS_BILLS_SUCCESS,
        })
      },
      errorActionType: actionTypes.DOWNLOAD_HARDWARE_SHOPS_BILLS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }
