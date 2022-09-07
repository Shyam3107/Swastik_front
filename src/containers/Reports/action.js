import * as actionTypes from "./actionTypes"
import { makeRequest } from "../../APIs/APIs"

export const getReports =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_REPORTS_PENDING,
    })

    const options = {
      method: "file",
      url: params.url,
      params: params,
      callback: () => {
        dispatch({
          type: actionTypes.GET_REPORTS_SUCCESS,
        })
      },
      errorActionType: actionTypes.GET_REPORTS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }
