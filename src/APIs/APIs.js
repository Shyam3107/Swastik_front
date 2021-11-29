import axios from "axios";
import toastMessage from "../components/CustomComponents/ToastMessage/toastMessage";
import { error, warn, success } from "../utils/constants";

export const backendURL = "http://localhost:5000";

const modules = {
  login: "/login",
  leave: "/leave",
  student: "/student",
  trips: "/vehicles/trips",
};

export const API = {
  //LOGIN
  LOGIN: `${modules.login}`,

  // Trips
  GET_TRIPS: `${modules.trips}/getTrips`,
  ADD_TRIPS: `${modules.trips}/addTrips`,
  UPLOAD_TRIPS: `${modules.trips}/uploadTrips`,
  EDIT_TRIPS: `${modules.trips}/editTrips`,
  DELETE_TRIPS: `${modules.trips}/deleteTrips`,
};

export const handleError = (dispatch = () => {}, action = {}, err) => {
  console.log("err ", err);
  let errMssg = err.response ? err.response.data.error : "Some Error Occured";
  dispatch(action);
  if (!navigator.onLine) return toastMessage("You Are Offline", warn);
  return toastMessage(errMssg, error);
};

export const makeRequest = (options = {}) => {
  const { url, params, method, callback, errorActionType, payload, dispatch } =
    options;

  switch (method) {
    case "get":
      axios
        .get(url, { params: params ? params : {} })
        .then(({ status, data }) => {
          if (status === 200) callback(data);
          return;
        })
        .catch((err) => {
          return handleError(
            dispatch,
            {
              type: errorActionType,
              err: err,
            },
            err
          );
        });
      return;

    case "post":
      axios
        .post(url, payload)
        .then(({ status, data }) => {
          if (status === 200) {
            callback(data);
            return toastMessage(data.message, success);
          }
        })
        .catch((err) => {
          return handleError(
            dispatch,
            {
              type: errorActionType,
              err: err,
            },
            err
          );
        });
      return;

    case "put":
      axios
        .put(url, payload)
        .then(({ status, data }) => {
          if (status === 200) {
            callback(data);
            return toastMessage(data.message, success);
          }
        })
        .catch((err) => {
          return handleError(
            dispatch,
            {
              type: errorActionType,
              err: err,
            },
            err
          );
        });
      return;

    case "delete":
      axios
        .delete(url, { data: payload })
        .then(({ status, data }) => {
          if (status === 200) {
            callback(data);
            return toastMessage(data.message, success);
          }
        })
        .catch((err) => {
          return handleError(
            dispatch,
            {
              type: errorActionType,
              err: err,
            },
            err
          );
        });
      return;

    default:
      return;
  }
};
