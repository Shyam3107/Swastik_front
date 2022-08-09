import * as actionTypes from "./actionTypes"
import { API, makeRequest } from "../../APIs/APIs"
import convertCSVToJson from "../../utils/convertCSVtoJSON"

export const getProducts =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_PRODUCTS_PENDING,
    })

    const options = {
      method: "get",
      url: API.GET_PRODUCTS,
      params: params,
      callback: (data) => {
        dispatch({
          type: actionTypes.GET_PRODUCTS_SUCCESS,
          payload: data,
        })
      },
      errorActionType: actionTypes.GET_PRODUCTS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const getProductsName =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_PRODUCTS_NAME_PENDING,
    })

    const options = {
      method: "get",
      url: API.GET_PRODUCTS_NAME,
      params: params,
      callback: (data) => {
        dispatch({
          type: actionTypes.GET_PRODUCTS_NAME_SUCCESS,
          payload: data,
        })
      },
      errorActionType: actionTypes.GET_PRODUCTS_NAME_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const addProducts =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.ADD_PRODUCTS_PENDING,
    })

    const options = {
      method: "post",
      url: API.ADD_PRODUCTS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.ADD_PRODUCTS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.ADD_PRODUCTS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const uploadProducts =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.UPLOAD_PRODUCTS_PENDING,
    })

    const options = {
      method: "post",
      url: API.UPLOAD_PRODUCTS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.UPLOAD_PRODUCTS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.UPLOAD_PRODUCTS_FAILURE,
      dispatch,
    }

    convertCSVToJson(payload, options)
  }

export const editProducts =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.EDIT_PRODUCTS_PENDING,
    })

    const options = {
      method: "put",
      url: API.EDIT_PRODUCTS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.EDIT_PRODUCTS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.EDIT_PRODUCTS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const deleteProducts =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_PRODUCTS_PENDING,
    })

    const options = {
      method: "delete",
      url: API.DELETE_PRODUCTS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.DELETE_PRODUCTS_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.DELETE_PRODUCTS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const downloadProducts =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DOWNLOAD_PRODUCTS_PENDING,
    })

    const options = {
      method: "file",
      url: API.DOWNLOAD_PRODUCTS,
      params: params,
      callback: () => {
        dispatch({
          type: actionTypes.DOWNLOAD_PRODUCTS_SUCCESS,
        })
      },
      errorActionType: actionTypes.DOWNLOAD_PRODUCTS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const downloadProductsById =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DOWNLOAD_PRODUCTS_BY_ID_PENDING,
    })

    const options = {
      method: "file",
      url: API.DOWNLOAD_PRODUCTS_BY_ID,
      params: params,
      callback: () => {
        dispatch({
          type: actionTypes.DOWNLOAD_PRODUCTS_BY_ID_SUCCESS,
        })
      },
      errorActionType: actionTypes.DOWNLOAD_PRODUCTS_BY_ID_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }
