import * as actionTypes from "./actionTypes"
import { API, makeRequest } from "../../APIs/APIs"
import convertCSVToJson from "../../utils/convertCSVtoJSON"

export const getDiesel =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_DIESEL_PENDING,
    })

    const options = {
      method: "get",
      url: API.GET_DIESELS,
      params: params,
      callback: (data) => {
        dispatch({
          type: actionTypes.GET_DIESEL_SUCCESS,
          payload: data.data,
        })
      },
      errorActionType: actionTypes.GET_DIESEL_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const addDiesel =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.ADD_DIESEL_PENDING,
    })

    const options = {
      method: "post",
      url: API.ADD_DIESELS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.ADD_DIESEL_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.ADD_DIESEL_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const uploadDiesel =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.UPLOAD_DIESEL_PENDING,
    })

    const options = {
      method: "post",
      url: API.UPLOAD_DIESELS,
      callback: () => {
        dispatch({
          type: actionTypes.UPLOAD_DIESEL_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.UPLOAD_DIESEL_FAILURE,
      dispatch,
    }
    convertCSVToJson(payload, options)
  }

export const editDiesel =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.EDIT_DIESEL_PENDING,
    })

    const options = {
      method: "put",
      url: API.EDIT_DIESELS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.EDIT_DIESEL_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.EDIT_DIESEL_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const deleteDiesel =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_DIESEL_PENDING,
    })

    const options = {
      method: "delete",
      url: API.DELETE_DIESELS,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.DELETE_DIESEL_SUCCESS,
        })
        cb()
      },
      errorActionType: actionTypes.DELETE_DIESEL_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }
