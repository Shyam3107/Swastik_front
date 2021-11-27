import toastMessage from "../../components/CustomComponents/ToastMessage/toastMessage";
import * as actionTypes from "./actionTypes";
import { success } from "../../utils/constants";

import axios from "axios";
import { API, handleError } from "../../APIs/APIs";

export const getLeave = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_LEAVE_PENDING,
  });
  axios
    .get(API.GET_LEAVE)
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch({
          type: actionTypes.GET_LEAVE_SUCCESS,
          payload: data.data,
        });
      }
      return;
    })
    .catch((err) => {
      return handleError(
        dispatch,
        {
          type: actionTypes.GET_LEAVE_FAILURE,
          err: err,
        },
        err
      );
    });
};

export const addLeave =
  (dtp, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.ADD_LEAVE_PENDING,
    });
    axios
      .post(API.ADD_LEAVE, dtp)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch({
            type: actionTypes.ADD_LEAVE_SUCCESS,
          });
          cb();
          return toastMessage(data.message, success);
        }
      })
      .catch((err) => {
        return handleError(
          dispatch,
          {
            type: actionTypes.ADD_LEAVE_FAILURE,
            err: err,
          },
          err
        );
      });
  };

export const editLeave =
  (dtp, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.EDIT_LEAVE_PENDING,
    });
    axios
      .put(API.EDIT_LEAVE, dtp)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch({
            type: actionTypes.EDIT_LEAVE_SUCCESS,
          });
          cb();
          return toastMessage(data.message, success);
        }
      })
      .catch((err) => {
        return handleError(
          dispatch,
          {
            type: actionTypes.EDIT_LEAVE_FAILURE,
            err: err,
          },
          err
        );
      });
  };
