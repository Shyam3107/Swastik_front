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
  diesels: "/diesels/pumpDiesel",
  vehicleOwner: "/diesels/vehicles",
  driverExpenses: "/expenses/driver",
  officeExpenses: "/expenses/office",
  vehiclesExpenses: "/expenses/vehicles",
  configureAccounts: "/configure/accounts",
  receipts: "/receipts",
  reports: "/reports",
  products: "/store/product",
  logistics: "/store/logistic",
  hardwareShopBill: "/store/hardwareshops",
}

export const API = {
  // LOGIN
  LOGIN: `${modules.user}/login`,
  FORGOT_PASSWORD: `${modules.user}/forgotPassword`,

  // HOME
  GET_HOME: `${modules.home}`,

  // Trips
  GET_TRIPS: `${modules.trips}/getTrips`,
  GET_TRIPS_BY_VEHICLE: `${modules.trips}/getTripsByVehicle`,
  ADD_TRIPS: `${modules.trips}/addTrips`,
  UPLOAD_TRIPS: `${modules.trips}/uploadTrips`,
  EDIT_TRIPS: `${modules.trips}/editTrips`,
  DELETE_TRIPS: `${modules.trips}/deleteTrips`,
  DOWNLOAD_TRIPS: `${modules.trips}/downloadTrips`,
  DOWNLOAD_TRIPS_BY_VEHICLE: `${modules.trips}/downloadTripsByVehicle`,

  // VOUCHERS
  GET_VOUCHERS: `${modules.vouchers}/getVouchers`,
  ADD_VOUCHERS: `${modules.vouchers}/addVouchers`,
  UPLOAD_VOUCHERS: `${modules.vouchers}/uploadVouchers`,
  EDIT_VOUCHERS: `${modules.vouchers}/editVouchers`,
  DELETE_VOUCHERS: `${modules.vouchers}/deleteVouchers`,
  DOWNLOAD_VOUCHERS: `${modules.vouchers}/downloadVouchers`,

  // DOCUMENTS
  GET_DOCUMENTS: `${modules.documents}/getDocuments`,
  ADD_DOCUMENTS: `${modules.documents}/addDocuments`,
  UPLOAD_DOCUMENTS: `${modules.documents}/uploadDocuments`,
  EDIT_DOCUMENTS: `${modules.documents}/editDocuments`,
  DELETE_DOCUMENTS: `${modules.documents}/deleteDocuments`,
  DOWNLOAD_DOCUMENTS: `${modules.documents}/downloadDocuments`,

  // DIESELS
  GET_DIESELS: `${modules.diesels}/getDiesels`,
  GET_DIESELS_BY_VEHICLE: `${modules.diesels}/getDieselsByVehicle`,
  GET_DIESELS_BY_PUMP: `${modules.diesels}/getDieselsByPump`,
  ADD_DIESELS: `${modules.diesels}/addDiesels`,
  UPLOAD_DIESELS: `${modules.diesels}/uploadDiesels`,
  EDIT_DIESELS: `${modules.diesels}/editDiesels`,
  DELETE_DIESELS: `${modules.diesels}/deleteDiesels`,
  DOWNLOAD_DIESELS: `${modules.diesels}/downloadDiesels`,
  DOWNLOAD_DIESELS_BY_VEHICLE: `${modules.diesels}/downloadDieselsByVehicle`,
  DOWNLOAD_DIESELS_BY_PUMP: `${modules.diesels}/downloadDieselsByPump`,

  // VEHICLE OWNER
  GET_VEHICLE_OWNER: `${modules.vehicleOwner}/getOwner`,
  ADD_VEHICLE_OWNER: `${modules.vehicleOwner}/addOwner`,
  UPLOAD_VEHICLE_OWNER: `${modules.vehicleOwner}/uploadOwner`,
  EDIT_VEHICLE_OWNER: `${modules.vehicleOwner}/editOwner`,
  DELETE_VEHICLE_OWNER: `${modules.vehicleOwner}/deleteOwner`,
  DOWNLOAD_VEHICLE_OWNER: `${modules.vehicleOwner}/downloadOwner`,

  // OFFICE EXPENSES
  GET_OFFICE_EXPENSE: `${modules.officeExpenses}/getExpenses`,
  ADD_OFFICE_EXPENSE: `${modules.officeExpenses}/addExpenses`,
  UPLOAD_OFFICE_EXPENSE: `${modules.officeExpenses}/uploadExpenses`,
  EDIT_OFFICE_EXPENSE: `${modules.officeExpenses}/editExpenses`,
  DELETE_OFFICE_EXPENSE: `${modules.officeExpenses}/deleteExpenses`,
  DOWNLOAD_OFFICE_EXPENSE: `${modules.officeExpenses}/downloadExpenses`,

  // VEHICLES EXPENSES
  GET_VEHICLES_EXPENSE: `${modules.vehiclesExpenses}/getExpenses`,
  ADD_VEHICLES_EXPENSE: `${modules.vehiclesExpenses}/addExpenses`,
  UPLOAD_VEHICLES_EXPENSE: `${modules.vehiclesExpenses}/uploadExpenses`,
  EDIT_VEHICLES_EXPENSE: `${modules.vehiclesExpenses}/editExpenses`,
  DELETE_VEHICLES_EXPENSE: `${modules.vehiclesExpenses}/deleteExpenses`,
  DOWNLOAD_VEHICLES_EXPENSE: `${modules.vehiclesExpenses}/downloadExpenses`,

  // CONFIGURATION ACCOUNTS
  GET_ACCOUNTS: `${modules.configureAccounts}/getAccount`,
  ADD_ACCOUNTS: `${modules.configureAccounts}/addAccount`,
  EDIT_ACCOUNTS: `${modules.configureAccounts}/editAccount`,
  DELETE_ACCOUNTS: `${modules.configureAccounts}/deleteAccount`,

  // RECEIPTS
  GET_RECEIPT: `${modules.receipts}/getReceipt`,
  ADD_RECEIPT: `${modules.receipts}/addReceipt`,
  EDIT_RECEIPT: `${modules.receipts}/editReceipt`,
  DELETE_RECEIPT: `${modules.receipts}/deleteReceipt`,
  DOWNLOAD_RECEIPT: `${modules.receipts}/downloadReceipt`,

  // PRODUCTS
  GET_PRODUCTS: `${modules.products}/getProducts`,
  GET_PRODUCTS_NAME: `${modules.products}/getProductsName`,
  ADD_PRODUCTS: `${modules.products}/addProducts`,
  EDIT_PRODUCTS: `${modules.products}/editProducts`,
  UPLOAD_PRODUCTS: `${modules.products}/uploadProducts`,
  DELETE_PRODUCTS: `${modules.products}/deleteProducts`,
  DOWNLOAD_PRODUCTS: `${modules.products}/downloadProducts`,
  DOWNLOAD_PRODUCTS_BY_ID: `${modules.products}//downloadProductsById`,

  // LOGISTICS
  GET_LOGISTICS: `${modules.logistics}/getLogistics`,
  ADD_LOGISTICS: `${modules.logistics}/addLogistics`,
  EDIT_LOGISTICS: `${modules.logistics}/editLogistics`,
  UPLOAD_LOGISTICS: `${modules.logistics}/uploadLogistics`,
  DELETE_LOGISTICS: `${modules.logistics}/deleteLogistics`,
  DOWNLOAD_LOGISTICS: `${modules.logistics}/downloadLogistics`,

  // HARDWARE SHOP BILLS
  GET_HARDWARE_SHOPS_BILLS: `${modules.hardwareShopBill}/getBills`,
  GET_UNIQUE_SHOPS: `${modules.hardwareShopBill}/getUniqueShop`,
  GET_BILLS_BY_VEHICLE: `${modules.hardwareShopBill}/getBillsByVehicle`,
  GET_BILLS_BY_SHOP: `${modules.hardwareShopBill}/getBillsByShop`,
  ADD_HARDWARE_SHOPS_BILLS: `${modules.hardwareShopBill}/addBills`,
  EDIT_HARDWARE_SHOPS_BILLS: `${modules.hardwareShopBill}/editBills`,
  UPLOAD_HARDWARE_SHOPS_BILLS: `${modules.hardwareShopBill}/uploadBills`,
  DELETE_HARDWARE_SHOPS_BILLS: `${modules.hardwareShopBill}/deleteBills`,
  DOWNLOAD_HARDWARE_SHOPS_BILLS: `${modules.hardwareShopBill}/downloadBills`,
  DOWNLOAD_BILLS_BY_VEHICLE: `${modules.hardwareShopBill}/downloadBillsByVehicle`,
  DOWNLOAD_BILLS_BY_SHOP: `${modules.hardwareShopBill}/downloadBillsByShop`,

  // REPORTS
  GET_VEHICLES_REPORTS: `${modules.reports}/getVehiclesReport`,
  GET_DIESELS_REPORTS: `${modules.reports}/getDieselsReport`,
  GET_HARDWARE_SHOPS_REPORT: `${modules.reports}/getHardwareShopReport`,
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
          link.download = `${params?.filename ?? new Date().getTime()}.xlsx`
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
