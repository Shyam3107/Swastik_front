import toastMessage from "../../components/CustomComponents/ToastMessage/toastMessage"
import * as actionTypes from "./actionTypes"
import { success } from "../../utils/constants"
import { API, makeRequest } from "../../APIs/APIs"

export const userLogin =
  (params = {}, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN_PENDING,
    })

    const options = {
      method: "get",
      url: API.LOGIN,
      params: params,
      callback: (data) => {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: data,
        })
        sessionStorage.setItem("user", JSON.stringify(data.user))
        sessionStorage.setItem("token", data.token)
        toastMessage(data.message, success)
        cb()
      },
      errorActionType: actionTypes.LOGIN_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const forgotPassword =
  (params = {}, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.FORGOT_PASSWORD_PENDING,
    })

    const options = {
      method: "get",
      url: API.FORGOT_PASSWORD,
      params: params,
      callback: (data) => {
        dispatch({
          type: actionTypes.FORGOT_PASSWORD_SUCCESS,
          payload: data,
        })
        toastMessage(data.message, success)
        cb()
      },
      errorActionType: actionTypes.FORGOT_PASSWORD_FAILURE,
      dispatch,
    }

    makeRequest(options)
  }

export const userLogout = () => (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT,
  })
  return toastMessage("Logout Successfull", success)
}
