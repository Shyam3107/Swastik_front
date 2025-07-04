import axios from "axios";
import dotenv from "dotenv";
import toastMessage from "../components/CustomComponents/ToastMessage/toastMessage";
import { error, warn, success } from "../utils/constants";

dotenv.config();

// eslint-disable-next-line
const env = process.env.REACT_APP_ENV;

let backendURL;

//backendURL = "https://swastik-backend.onrender.com";
backendURL = "https://swastik-back-new.onrender.com";

//backendURL = "http://localhost:9001";
//let backendURL = "https://swastik-back.vercel.app"

//if (env && env === "DEV") backendURL = "http://localhost:9000"

export { backendURL };

const modules = {
  user: "/user",
  home: "/home",
  trips: "/vehicles/trips",
  drivers: "/vehicles/drivers",
  documents: "/vehicles/documents",
  vouchers: "/vehicles/vouchers",
  diesels: "/diesels/pumpDiesel",
  vehicleOwner: "/diesels/vehicles",
  officeExpenses: "/expenses/office",
  vehiclesExpenses: "/expenses/vehicles",
  configureAccounts: "/configure/accounts",
  receipts: "/receipts",
  reports: "/reports",
  products: "/store/product",
  logistics: "/store/logistic",
  hardwareShopBill: "/store/hardwareshops",
  fleets: "/fleets",
};

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
  UPLOAD_TRIPS_RATES: `${modules.trips}/uploadRates`,
  EDIT_TRIPS: `${modules.trips}/editTrips`,
  DELETE_TRIPS: `${modules.trips}/deleteTrips`,
  DOWNLOAD_TRIPS: `${modules.trips}/downloadTrips`,
  DOWNLOAD_TRIPS_BY_VEHICLE: `${modules.trips}/downloadTripsByVehicle`,

  //DRIVERS
  GET_DRIVERS: `${modules.drivers}/getDrivers`,
  ADD_DRIVER: `${modules.drivers}/addDriver`,
  EDIT_DRIVER: `${modules.drivers}/editDriver`,
  UPLOAD_DRIVERS: `${modules.drivers}/uploadDrivers`,
  DOWNLOAD_DRIVER: `${modules.drivers}/downloadDriver`,
  DELETE_DRIVER: `${modules.drivers}/deleteDriver`,

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
  DOWNLOAD_MISSING_DOCUMENTS: `${modules.documents}/downloadMissingDocuments`,
  COMPLETE_VEHICLE_NUMBER: `${modules.documents}/completeVehicleNum`,

  // DIESELS
  GET_DIESELS: `${modules.diesels}/getDiesels`,
  GET_DIESELS_BY_VEHICLE: `${modules.diesels}/getDieselsByVehicle`,
  GET_DIESELS_BY_PUMP: `${modules.diesels}/getDieselsByPump`,
  GET_DIESELS_PUMP_NAMES: `${modules.diesels}/getUniquePumpNames`,
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

  // FLEETS
  GET_FLEET: `${modules.fleets}/getFleet`,
  ADD_FLEET: `${modules.fleets}/addFleet`,
  UPLOAD_FLEET: `${modules.fleets}/uploadFleet`,
  EDIT_FLEET: `${modules.fleets}/editFleet`,
  DELETE_FLEET: `${modules.fleets}/deleteFleet`,
  DOWNLOAD_FLEET: `${modules.fleets}/downloadFleet`,
  GET_FLEET_LIST_FOR_TRIPS: `${modules.fleets}/getFleetListForTrips`,

  // RECEIPTS
  GET_RECEIPT: `${modules.receipts}/getReceipt`,
  ADD_RECEIPT: `${modules.receipts}/addReceipt`,
  UPLOAD_RECEIPT: `${modules.receipts}/uploadReceipt`,
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
  GET_VEHICLES_DIESELS_REPORT: `${modules.reports}/getVehicleDieselReport`,
  GET_SITE_REPORT: `${modules.reports}/getSiteReport`,
  GET_ALL_SITE_REPORT: `${modules.reports}/getAllSiteReport`,
  DOWNLOAD_ALL_VEHICLE_WISE_REPORT: `${modules.reports}/downloadAllVehicleWiseReport`,
  DOWNLOAD_SITE_REPORT: `${modules.reports}/downloadSiteReport`,
  DOWNLOAD_ALL_SITES_ROKAR: `${modules.reports}/downloadAllSitesRokar`,
};

export const handleError = (dispatch = () => {}, action = {}, err = {}) => {
  dispatch(action);
  if (!navigator.onLine) return toastMessage("You Are Offline", warn);
  let errMssg = err.response
    ? err?.response?.data?.errors
    : err.message
    ? err.message
    : "Some Error Occured";

  if (!errMssg) errMssg = "Some Error Occured";
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

    case "file":
      axios
        .get(url, {
          responseType: "blob",
          params: params ? params : {},
        })
        .then(({ status, data, headers }) => {
          if (status !== 200)
            throw new Error("Failed to Download Report, Please try again");
          const blob = new Blob([data]);
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          if (headers && headers["content-type"] === "application/zip")
            link.download = `${params?.filename ?? new Date().getTime()}.zip`;
          else
            link.download = `${params?.filename ?? new Date().getTime()}.xlsx`;
          link.click();
          link.remove();
          callback();
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

    // Upload the file and get file in response
    // We need to send file and receive file thas why using delete request
    case "postFile":
      axios
        .delete(url, {
          responseType: "blob",
          data: payload,
        })
        .then(({ status, data, headers }) => {
          if (status !== 200)
            throw new Error("Failed to Download, Please try again");
          const blob = new Blob([data]);
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          if (headers && headers["content-type"] === "application/zip")
            link.download = `${params?.filename ?? new Date().getTime()}.zip`;
          else
            link.download = `${params?.filename ?? new Date().getTime()}.xlsx`;
          link.click();
          link.remove();
          callback();
          return toastMessage(
            "File uploaded Successfully, See downloaded File for more Detail",
            success
          );
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
