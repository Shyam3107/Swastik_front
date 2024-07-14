import * as actionTypes from "./actionTypes"
import { API, makeRequest } from "../../APIs/APIs"
import convertCSVToJson from "../../utils/convertCSVtoJSON"

export const getDocuments =
  (params = {}) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.GET_DOCUMENTS_PENDING,
      })

      const options = {
        method: "get",
        url: API.GET_DOCUMENTS,
        params: params,
        callback: (data) => {
          dispatch({
            type: actionTypes.GET_DOCUMENTS_SUCCESS,
            payload: data,
          })
        },
        errorActionType: actionTypes.GET_DOCUMENTS_FAILURE,
        dispatch,
      }

      makeRequest(options)
    }

export const addDocuments =
  (payload, cb = () => { }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.ADD_DOCUMENTS_PENDING,
      })

      const options = {
        method: "post",
        url: API.ADD_DOCUMENTS,
        payload: payload,
        callback: (data) => {
          dispatch({
            type: actionTypes.ADD_DOCUMENTS_SUCCESS,
          })
          cb()
        },
        errorActionType: actionTypes.ADD_DOCUMENTS_FAILURE,
        dispatch,
      }

      makeRequest(options)
    }

export const uploadDocuments =
  (payload, cb = () => { }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.UPLOAD_DOCUMENTS_PENDING,
      })

      const options = {
        method: "post",
        url: API.UPLOAD_DOCUMENTS,
        payload: payload,
        callback: (data) => {
          dispatch({
            type: actionTypes.UPLOAD_DOCUMENTS_SUCCESS,
          })
          cb()
        },
        errorActionType: actionTypes.UPLOAD_DOCUMENTS_FAILURE,
        dispatch,
      }

      convertCSVToJson(payload, options)
    }

export const editDocuments =
  (payload, cb = () => { }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.EDIT_DOCUMENTS_PENDING,
      })

      const options = {
        method: "put",
        url: API.EDIT_DOCUMENTS,
        payload: payload,
        callback: (data) => {
          dispatch({
            type: actionTypes.EDIT_DOCUMENTS_SUCCESS,
          })
          cb()
        },
        errorActionType: actionTypes.EDIT_DOCUMENTS_FAILURE,
        dispatch,
      }

      makeRequest(options)
    }

export const deleteDocuments =
  (payload, cb = () => { }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.DELETE_DOCUMENTS_PENDING,
      })

      const options = {
        method: "delete",
        url: API.DELETE_DOCUMENTS,
        payload: payload,
        callback: (data) => {
          dispatch({
            type: actionTypes.DELETE_DOCUMENTS_SUCCESS,
          })
          cb()
        },
        errorActionType: actionTypes.DELETE_DOCUMENTS_FAILURE,
        dispatch,
      }

      makeRequest(options)
    }

export const downloadDocuments =
  (params = {}) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.DOWNLOAD_DOCUMENTS_PENDING,
      })

      const options = {
        method: "file",
        url: API.DOWNLOAD_DOCUMENTS,
        params: params,
        callback: () => {
          dispatch({
            type: actionTypes.DOWNLOAD_DOCUMENTS_SUCCESS,
          })
        },
        errorActionType: actionTypes.DOWNLOAD_DOCUMENTS_FAILURE,
        dispatch,
      }

      makeRequest(options)
    }
