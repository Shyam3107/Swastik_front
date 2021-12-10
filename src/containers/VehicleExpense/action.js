import * as actionTypes from "./actionTypes";
import { API, makeRequest } from "../../APIs/APIs";

export const getExpense =
  (params = {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.GET_VEHICLES_EXPENSE_PENDING,
    });

    const options = {
      method: "get",
      url: API.GET_VEHICLES_EXPENSE,
      params: params,
      callback: (data) => {
        dispatch({
          type: actionTypes.GET_VEHICLES_EXPENSE_SUCCESS,
          payload: data.data,
        });
      },
      errorActionType: actionTypes.GET_VEHICLES_EXPENSE_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const addExpense =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.ADD_VEHICLES_EXPENSE_PENDING,
    });

    const options = {
      method: "post",
      url: API.ADD_VEHICLES_EXPENSE,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.ADD_VEHICLES_EXPENSE_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.ADD_VEHICLES_EXPENSE_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const uploadExpense =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.UPLOAD_VEHICLES_EXPENSE_PENDING,
    });

    const options = {
      method: "post",
      url: API.UPLOAD_VEHICLES_EXPENSE,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.UPLOAD_VEHICLES_EXPENSE_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.UPLOAD_VEHICLES_EXPENSE_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const editExpense =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.EDIT_VEHICLES_EXPENSE_PENDING,
    });

    const options = {
      method: "put",
      url: API.EDIT_VEHICLES_EXPENSE,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.EDIT_VEHICLES_EXPENSE_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.EDIT_VEHICLES_EXPENSE_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };

export const deleteExpense =
  (payload, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_VEHICLES_EXPENSE_PENDING,
    });

    const options = {
      method: "delete",
      url: API.DELETE_VEHICLES_EXPENSE,
      payload: payload,
      callback: (data) => {
        dispatch({
          type: actionTypes.DELETE_VEHICLES_EXPENSE_SUCCESS,
        });
        cb();
      },
      errorActionType: actionTypes.DELETE_VEHICLES_EXPENSE_FAILURE,
      dispatch,
    };

    makeRequest(options);
  };
