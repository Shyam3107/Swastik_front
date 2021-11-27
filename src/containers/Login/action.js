import toastMessage from "../../components/CustomComponents/ToastMessage/toastMessage";
import * as actionTypes from "./actionTypes";
import { success } from "../../utils/constants";
import urlSearchParams from "../../utils/urlSearchParams";

import axios from "axios";
import { API, handleError } from "../../APIs/APIs";

export const userLogin = (data, cb) => (dispatch) => {
  dispatch({
    type: actionTypes.LOGIN_PENDING,
  });

  axios
    .get(urlSearchParams(API.LOGIN, data))
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: data,
        });
        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("token", data.token);
        cb();
        return toastMessage("Login SuccessFull", success);
      }
      return;
    })
    .catch((err) => {
      return handleError(
        dispatch,
        {
          type: actionTypes.LOGIN_FAILURE,
          err: err,
        },
        err
      );
    });
};

export const userLogout = () => (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT,
  });
  return toastMessage("Logout SuccessFull", success);
};
