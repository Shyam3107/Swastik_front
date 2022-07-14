import * as actionTypes from "./actionTypes"
import { API, makeRequest } from "../../APIs/APIs"
import convertCSVToJson from "../../utils/convertCSVtoJSON"

export const getVouchers =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_VOUCHERS_PENDING,
    })

    const options = {
      method: "get",
      url: API.GET_VOUCHERS,
      params: params,
      callback: (data) => {
        dispatch({
          type: actionTypes.GET_VOUCHERS_SUCCESS,
          payload: data.data,
        })
      },
      errorActionType: actionTypes.GET_VOUCHERS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const addVouchers =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.ADD_VOUCHERS_PENDING,
    })

    const options = {
      method: "post",
      url: API.ADD_VOUCHERS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.ADD_VOUCHERS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.ADD_VOUCHERS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const uploadVouchers =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.UPLOAD_VOUCHERS_PENDING,
    })

    const options = {
      method: "post",
      url: API.UPLOAD_VOUCHERS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.UPLOAD_VOUCHERS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.UPLOAD_VOUCHERS_FAILURE,
      dispatch,
    }

    convertCSVToJson(payload, options)
  }

export const editVouchers =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.EDIT_VOUCHERS_PENDING,
    })

    const options = {
      method: "put",
      url: API.EDIT_VOUCHERS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.EDIT_VOUCHERS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.EDIT_VOUCHERS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const deleteVouchers =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_VOUCHERS_PENDING,
    })

    const options = {
      method: "delete",
      url: API.DELETE_VOUCHERS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.DELETE_VOUCHERS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.DELETE_VOUCHERS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }
