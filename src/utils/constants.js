import moment from "moment";

export const error = "error";
export const success = "success";
export const warn = "warn";

export const monthStart = moment().startOf("month");
export const monthEnd = moment().endOf("month");
export const yearEnd = moment().endOf("year");
export const currentDate = moment().endOf("day");
export const fromToPayload = (from, to) => {
  return {
    from: moment(from).toISOString(),
    to: moment(to).toISOString(),
  };
};

export const pumpNames = [
  "Lal Fuels",
  "H H Fuels",
  "Mangalam Fuels",
  "Raja Petrol Pump",
  "ChampaDevi Fuels",
  "Ajay Filing Station",
  "Balaji Fuels",
  "City Fuels",
  "Sharda Petroleum",
];

export const hostRoutes = {
  TRIPS: "/vehicles/trips",
  DOCUMENTS: "/vehicles/documents",
  VOUCHERS: "/vehicles/vouchers",
  DIESELS: "/diesels/pumpDiesel",
  VEHICLES_OWNER: "/diesels/vehiceOwner",
  OFFICE_EXPENSE: "/expenses/office",
  VEHICLES_EXPENSE: "/expenses/vehicles",
  RECEIPT: "/receipt",
  PRODUCTS: "/stores/products",
  LOGISTICS: "/stores/logistics",
  HARDWARE_SHOP_BILL: "/store/hardwareShopBill",
  REPORTS: "/reports",
  FLEETS: "/fleets",
  DRIVERS: "/drivers",
};

export const ROUTES = {
  //CONFIGURATION
  CONFIGURATION: "/configuration",

  // DIESELS
  DIESELS: hostRoutes.DIESELS,
  ADD_DIESEL: hostRoutes.DIESELS + "/add",
  EDIT_DIESEL: hostRoutes.DIESELS + "/:dieselId/edit",
  VIEW_DIESEL_BY_PUMP: hostRoutes.DIESELS + "/pump/:pumpName",
  VIEW_DIESEL_BY_VEHICLE: hostRoutes.DIESELS + "/vehicle/:vehicleNo",

  // DOCUMENTS
  DOCUMENTS: hostRoutes.DOCUMENTS,
  VIEW_DOCUMENT: hostRoutes.DOCUMENTS + "/:vehicleNo",
  EDIT_DOCUMENT: hostRoutes.DOCUMENTS + "/:vehicleNo/edit",
  ADD_DOCUMENT: hostRoutes.DOCUMENTS + "/add",

  // DRIVERS
  DRIVERS: hostRoutes.DRIVERS,
  ADD_DRIVERS: hostRoutes.DRIVERS + "/add",
  EDIT_DRIVERS: hostRoutes.DRIVERS + "/:driverId/edit",
  VIEW_DRIVERS: hostRoutes.DRIVERS + "/:driverId",

  // DRIVER HISTORY
  DRIVER_HISTORY: hostRoutes.DRIVERS + "/driverHistory",
  VIEW_DRIVER_HISTORY_BY_DRIVER:
    hostRoutes.DRIVERS + "/driverHistory/driver/:driverId",
  VIEW_DRIVER_HISTORY_BY_VEHICLE:
    hostRoutes.DRIVERS + "/driverHistory/vehicle/:vehicleId",
  ADD_DRIVER_HISTORY: hostRoutes.DRIVERS + "/driverHistory/add",
  EDIT_DRIVER_HISTORY: hostRoutes.DRIVERS + "/driverHistory/:historyId/edit",

  // FLEETS
  FLEETS: hostRoutes.FLEETS,
  ADD_FLEETS: hostRoutes.FLEETS + "/add",
  EDIT_FLEETS: hostRoutes.FLEETS + "/:vehicleNo/edit",

  // HARDWARE SHOPS BILLS
  HARDWARE_SHOP_BILL: hostRoutes.HARDWARE_SHOP_BILL,
  EDIT_HARDWARE_SHOP_BILL: hostRoutes.HARDWARE_SHOP_BILL + "/:billId/edit",
  VIEW_HARDWARE_SHOP_BILL_BY_SHOP:
    hostRoutes.HARDWARE_SHOP_BILL + "/shop/:shopName",
  VIEW_HARDWARE_SHOP_BILL_BY_VEHICLE:
    hostRoutes.HARDWARE_SHOP_BILL + "/vehicle/:vehicleNo",
  ADD_HARDWARE_SHOP_BILL: hostRoutes.HARDWARE_SHOP_BILL + "/add",

  // HOME
  HOME: "/home",

  // LOGIN
  LOGIN: "/login",

  // LOGISTIC
  LOGISTIC: hostRoutes.LOGISTICS,
  EDIT_LOGISTIC: hostRoutes.LOGISTICS + "/:logisticId/edit",
  ADD_LOGISTIC: hostRoutes.LOGISTICS + "/add",

  // LOGOUT
  LOGOUT: "/logout",

  // PRODUCT
  PRODUCT: hostRoutes.PRODUCTS,
  EDIT_PRODUCT: hostRoutes.PRODUCTS + "/:productId/edit",
  ADD_PRODUCT: hostRoutes.PRODUCTS + "/add",
  VIEW_PRODUCT: hostRoutes.PRODUCTS + "/:productId/",

  // OFFICE EXPENSE
  OFFICE_EXPENSE: hostRoutes.OFFICE_EXPENSE,
  EDIT_OFFICE_EXPENSE: hostRoutes.OFFICE_EXPENSE + "/:expenseId/edit",
  ADD_OFFICE_EXPENSE: hostRoutes.OFFICE_EXPENSE + "/add",

  // RECEIPT
  RECEIPT: hostRoutes.RECEIPT,
  EDIT_RECEIPT: hostRoutes.RECEIPT + "/:receiptId/edit",
  ADD_RECEIPT: hostRoutes.RECEIPT + "/add",

  // REPORTS
  REPORTS: "/reports",
  VIEW_OWN_REPORT: hostRoutes.REPORTS + "/site/:siteId",
  VIEW_ALL_SITE_REPORT: hostRoutes.REPORTS + "/allSites",

  // TRIPS
  TRIPS: hostRoutes.TRIPS,
  VIEW_TRIP: hostRoutes.TRIPS + "/:diNo",
  VIEW_TRIP_BY_VEHICLE: hostRoutes.TRIPS + "/vehicle/:vehicleNo",
  ADD_TRIP: hostRoutes.TRIPS + "/add",
  EDIT_TRIP: hostRoutes.TRIPS + "/:diNo/edit",

  // VEHICLE EXPENSE
  VEHICLES_EXPENSE: hostRoutes.VEHICLES_EXPENSE,
  EDIT_VEHICLES_EXPENSE: hostRoutes.VEHICLES_EXPENSE + "/:expenseId/edit",
  ADD_VEHICLES_EXPENSE: hostRoutes.VEHICLES_EXPENSE + "/add",

  // VEHICLE OWNER
  VEHICLES_OWNER: hostRoutes.VEHICLES_OWNER,
  ADD_VEHICLE_OWNER: hostRoutes.VEHICLES_OWNER + "/add",
  EDIT_VEHICLE_OWNER: hostRoutes.VEHICLES_OWNER + "/:vehicleNo/edit",

  // VOUCHERS
  VOUCHERS: hostRoutes.VOUCHERS,
  VIEW_VOUCHER: hostRoutes.VOUCHERS + "/:voucherId",
  ADD_VOUCHER: hostRoutes.VOUCHERS + "/add",
  EDIT_VOUCHER: hostRoutes.VOUCHERS + "/:voucherId/edit",
};

export const formatDate = (date, time = false) => {
  try {
    if (time) return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    else return moment(date).format("Do MMMM YYYY");
  } catch (error) {
    return "InValid Date";
  }
};

export const formatDateInDDMMYYY = (date = new Date()) => {
  try {
    return moment(date).format("DD-MM-YYYY");
  } catch (error) {
    return "InValid Date";
  }
};

export const includesInArray = (stringArray, search) => {
  let exist = stringArray.every((val) => {
    if (typeof val === "number") val = val?.toString();
    return !val?.toLowerCase()?.includes(search?.toLowerCase());
  });
  return !exist;
};

export const formatInDayEnd = (date = moment()) => {
  try {
    return moment(date).endOf("day").toISOString();
  } catch (error) {
    return "InValid Date";
  }
};

export const validateUrlValid = (userInput) => {
  if (!userInput) return false;
  var expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  let res = userInput.match(expression);
  return res ? true : false;
};

export const InputTypes = {
  TEXT: "text",
  NUMBER: "number",
  DATE: "date",
  SWITCH: "switch",
  SELECT_AUTO_COMPLETE: "selectAutoComplete",
  SELECT: "select",
  CUSTOM_SELECT: "customSelect",
};
