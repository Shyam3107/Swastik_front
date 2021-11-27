import toastMessage from "../../components/CustomComponents/ToastMessage/toastMessage";
import * as actionTypes from "./actionTypes";
import { success } from "../../utils/constants";

import axios from "axios";
import { API, handleError } from "../../APIs/APIs";

export const getTax = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_TAX_PENDING,
  });
  axios
    .get(API.GET_TAX)
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch({
          type: actionTypes.GET_TAX_SUCCESS,
          payload: data.data,
        });
      }
      return;
    })
    .catch((err) => {
      return handleError(
        dispatch,
        {
          type: actionTypes.GET_TAX_FAILURE,
          err: err,
        },
        err
      );
    });
};

export const addTax =(dtp, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.ADD_TAX_PENDING,
    });
    axios
      .post(API.ADD_TAX, dtp)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch({
            type: actionTypes.ADD_TAX_SUCCESS,
          });
          cb();
          return toastMessage(data.message, success);
        }
      })
      .catch((err) => {
        return handleError(
          dispatch,
          {
            type: actionTypes.ADD_TAX_FAILURE,
            err: err,
          },
          err
        );
      });
  };
