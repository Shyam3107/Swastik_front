import * as actionTypes from "./actionTypes"
import { API, makeRequest } from "../../APIs/APIs"

export const getHome =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_HOME_PENDING,
    })

    const options = {
      method: "get",
      url: API.GET_HOME,
      params: params,
      callback: (data) => {
        dispatch({
          type: actionTypes.GET_HOME_SUCCESS,
          payload: data.data,
        })
      },
      errorActionType: actionTypes.GET_HOME_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }
