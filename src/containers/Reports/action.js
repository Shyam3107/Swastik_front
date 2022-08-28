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

export const getDieselsReport =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_DIESELS_REPORTS_PENDING,
    })

    const options = {
      method: "file",
      url: API.GET_DIESELS_REPORTS,
      params: params,
      callback: () => {
        dispatch({
          type: actionTypes.GET_DIESELS_REPORTS_SUCCESS,
        })
      },
      errorActionType: actionTypes.GET_DIESELS_REPORTS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const getHardwareShopsReport =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_HARDWARE_SHOPS_REPORTS_PENDING,
    })

    const options = {
      method: "file",
      url: API.GET_HARDWARE_SHOPS_REPORT,
      params: params,
      callback: () => {
        dispatch({
          type: actionTypes.GET_HARDWARE_SHOPS_REPORTS_SUCCESS,
        })
      },
      errorActionType: actionTypes.GET_HARDWARE_SHOPS_REPORTS_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }
