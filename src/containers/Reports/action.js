import * as actionTypes from "./actionTypes"
import { makeRequest } from "../../APIs/APIs"

export const getReports =
  (params = {}) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.GET_REPORTS_PENDING,
      })

      const options = {
        method: "get",
        url: params.url,
        params: params,
        callback: (data) => {
          dispatch({
            type: actionTypes.GET_REPORTS_SUCCESS,
            payload: data.data
          })
        },
        errorActionType: actionTypes.DOWNLOAD_REPORTS_FAILURE,
        dispatch,
      }

      makeRequest(options)
    }

export const downloadReports =
  (params = {}) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.DOWNLOAD_REPORTS_PENDING,
      })

      const options = {
        method: "file",
        url: params.url,
        params: params,
        callback: () => {
          dispatch({
            type: actionTypes.DOWNLOAD_REPORTS_SUCCESS,
          })
        },
        errorActionType: actionTypes.GET_REPORTS_FAILURE,
        dispatch,
      }

      makeRequest(options)
    }