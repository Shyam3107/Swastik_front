import axios from "axios"
import dotenv from "dotenv"
import toastMessage from "../components/CustomComponents/ToastMessage/toastMessage"
import { error, warn, success } from "../utils/constants"

dotenv.config()

const env = process.env.REACT_APP_ENV
let backendURL = "https://swastik-backend.herokuapp.com"
if (env && env === "DEV") backendURL = "http://localhost:9000"

export { backendURL }

const modules = {
  user: "/user",
  home: "/home",
  trips: "/vehicles/trips",
  documents: "/vehicles/documents",
  vouchers: "/vehicles/vouchers",
  diesels: "/vehicles/diesels",
  driverExpenses: "/expenses/driver",
  officeExpenses: "/expenses/office",
  vehiclesExpenses: "/expenses/vehicles",
  configureAccounts: "/configure/accounts",
  receipts: "/receipts",
  reports: "/reports",
}

export const API = {
  //LOGIN
  LOGIN: `${modules.user}/login`,
  FORGOT_PASSWORD: `${modules.user}/forgotPassword`,

  // HOME
  GET_HOME: `${modules.home}`,

  // Trips
  GET_TRIPS: `${modules.trips}/getTrips`,
  ADD_TRIPS: `${modules.trips}/addTrips`,
  UPLOAD_TRIPS: `${modules.trips}/uploadTrips`,
  EDIT_TRIPS: `${modules.trips}/editTrips`,
  DELETE_TRIPS: `${modules.trips}/deleteTrips`,

  // VOUCHERS
  GET_VOUCHERS: `${modules.vouchers}/getVouchers`,
  ADD_VOUCHERS: `${modules.vouchers}/addVouchers`,
  UPLOAD_VOUCHERS: `${modules.vouchers}/uploadVouchers`,
  EDIT_VOUCHERS: `${modules.vouchers}/editVouchers`,
  DELETE_VOUCHERS: `${modules.vouchers}/deleteVouchers`,

  //DOCUMENTS
  GET_DOCUMENTS: `${modules.documents}/getDocuments`,
  ADD_DOCUMENTS: `${modules.documents}/addDocuments`,
  UPLOAD_DOCUMENTS: `${modules.documents}/uploadDocuments`,
  EDIT_DOCUMENTS: `${modules.documents}/editDocuments`,
  DELETE_DOCUMENTS: `${modules.documents}/deleteDocuments`,

  // DIESELS
  GET_DIESELS: `${modules.diesels}/getDiesels`,
  ADD_DIESELS: `${modules.diesels}/addDiesels`,
  UPLOAD_DIESELS: `${modules.diesels}/uploadDiesels`,
  EDIT_DIESELS: `${modules.diesels}/editDiesels`,
  DELETE_DIESELS: `${modules.diesels}/deleteDiesels`,

  //OFFICE EXPENSES
  GET_OFFICE_EXPENSE: `${modules.officeExpenses}/getExpenses`,
  ADD_OFFICE_EXPENSE: `${modules.officeExpenses}/addExpenses`,
  UPLOAD_OFFICE_EXPENSE: `${modules.officeExpenses}/uploadExpenses`,
  EDIT_OFFICE_EXPENSE: `${modules.officeExpenses}/editExpenses`,
  DELETE_OFFICE_EXPENSE: `${modules.officeExpenses}/deleteExpenses`,

  //VEHICLES EXPENSES
  GET_VEHICLES_EXPENSE: `${modules.vehiclesExpenses}/getExpenses`,
  ADD_VEHICLES_EXPENSE: `${modules.vehiclesExpenses}/addExpenses`,
  UPLOAD_VEHICLES_EXPENSE: `${modules.vehiclesExpenses}/uploadExpenses`,
  EDIT_VEHICLES_EXPENSE: `${modules.vehiclesExpenses}/editExpenses`,
  DELETE_VEHICLES_EXPENSE: `${modules.vehiclesExpenses}/deleteExpenses`,

  //CONFIGURATION ACCOUNTS
  GET_ACCOUNTS: `${modules.configureAccounts}/getAccount`,
  ADD_ACCOUNTS: `${modules.configureAccounts}/addAccount`,
  EDIT_ACCOUNTS: `${modules.configureAccounts}/editAccount`,
  DELETE_ACCOUNTS: `${modules.configureAccounts}/deleteAccount`,

  // RECEIPTS
  GET_RECEIPT: `${modules.receipts}/getReceipt`,
  ADD_RECEIPT: `${modules.receipts}/addReceipt`,
  EDIT_RECEIPT: `${modules.receipts}/editReceipt`,
  DELETE_RECEIPT: `${modules.receipts}/deleteReceipt`,

  // REPORTS
  GET_VEHICLES_REPORTS: `${modules.reports}/getVehiclesReport`,
}

export const handleError = (dispatch = () => {}, action = {}, err = {}) => {
  dispatch(action)
  if (!navigator.onLine) return toastMessage("You Are Offline", warn)
  let errMssg = err.response
    ? err?.response?.data?.errors
    : err.message
    ? err.message
    : "Some Error Occured"

  if (!errMssg) errMssg = "Some Error Occured"
  return toastMessage(errMssg, error)
}

export const makeRequest = (options = {}) => {
  const { url, params, method, callback, errorActionType, payload, dispatch } =
    options

  switch (method) {
    case "get":
      axios
        .get(url, { params: params ? params : {} })
        .then(({ status, data }) => {
          if (status === 200) callback(data)
          return
        })
        .catch((err) => {
          return handleError(
            dispatch,
            {
              type: errorActionType,
              err: err,
            },
            err
          )
        })
      return

    case "post":
      axios
        .post(url, payload)
        .then(({ status, data }) => {
          if (status === 200) {
            callback(data)
            return toastMessage(data.message, success)
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
          )
        })
      return

    case "put":
      axios
        .put(url, payload)
        .then(({ status, data }) => {
          if (status === 200) {
            callback(data)
            return toastMessage(data.message, success)
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
          )
        })
      return

    case "delete":
      axios
        .delete(url, { data: payload })
        .then(({ status, data }) => {
          if (status === 200) {
            callback(data)
            return toastMessage(data.message, success)
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
          )
        })
      return

    case "file":
      axios
        .get(url, {
          responseType: "blob",
          params: params ? params : {},
        })
        .then(({ status, data }) => {
          if (status !== 200)
            throw new Error("Failed to Download Report, Please try again")
          const blob = new Blob([data])
          const link = document.createElement("a")
          link.href = window.URL.createObjectURL(blob)
          link.download = `${new Date().getTime()}.xlsx`
          link.click()
          link.remove()
          callback()
          return
        })
        .catch((err) => {
          return handleError(
            dispatch,
            {
              type: errorActionType,
              err: err,
            },
            err
          )
        })
      return

    default:
      return
  }
}
