import * as actionTypes from "./actionTypes"
import { API, makeRequest } from "../../APIs/APIs"

export const getVehiclesReport =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_VEHICLES_REPORTS_PENDING,
    })

    const options = {
      method: "file",
      url: API.GET_VEHICLES_REPORTS,
      params: params,
      callback: () => {
        dispatch({
          type: actionTypes.GET_VEHICLES_REPORTS_SUCCESS,
        })
      },
      errorActionType: actionTypes.GET_VEHICLES_REPORTS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }
