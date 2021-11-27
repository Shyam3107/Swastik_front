import toastMessage from "../../components/CustomComponents/ToastMessage/toastMessage";
import * as actionTypes from "./actionTypes";
import { success } from "../../utils/constants";

import axios from "axios";
import { API, handleError } from "../../APIs/APIs";

export const getStudents = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_STUDENTS_PENDING,
  });
  axios
    .get(API.GET_STUDENTS)
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch({
          type: actionTypes.GET_STUDENTS_SUCCESS,
          payload: data.data,
        });
      }
      return;
    })
    .catch((err) => {
      return handleError(
        dispatch,
        {
          type: actionTypes.GET_STUDENTS_FAILURE,
          err: err,
        },
        err
      );
    });
};

export const addStudents =
  (dtp, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.ADD_STUDENTS_PENDING,
    });
    axios
      .post(API.ADD_STUDENTS, dtp)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch({
            type: actionTypes.ADD_STUDENTS_SUCCESS,
          });
          cb();
          return toastMessage(data.message, success);
        }
      })
      .catch((err) => {
        return handleError(
          dispatch,
          {
            type: actionTypes.ADD_STUDENTS_FAILURE,
            err: err,
          },
          err
        );
      });
  };
