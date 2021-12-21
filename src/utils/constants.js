import moment from "moment";

export const error = "error";
export const success = "success";
export const warn = "warn";

export const monthStart = moment().startOf("month");
export const monthEnd = moment().endOf("month");
export const yearEnd = moment().endOf("year");
export const currentDate = moment().endOf("day");

export const pumpNames = [
  "Saurabh Fuels",
  "Saudimini Fuels",
  "Lal Fuels",
  "HPCL",
  "BPCL",
  "IOCL",
];

export const ROUTES = {
  // LOGIN
  LOGIN: "/login",

  // LOGOUT
  LOGOUT: "/logout",

  // HOME
  HOME: "/home",

  // TRIPS
  TRIPS: "/vehicles/trips",
  VIEW_TRIP: "/vehicles/trips/:diNo",
  ADD_TRIP: "/vehicles/trips/add",
  EDIT_TRIP: "/vehicles/trips/:diNo/edit",

  // DOCUMENTS
  DOCUMENTS: "/vehicles/documents",
  VIEW_DOCUMENT: "/vehicles/document/:vehicleNo",
  EDIT_DOCUMENT: "/vehicles/document/:vehicleNo/edit",
  ADD_DOCUMENT: "/vehicles/document/add",

  // OFFICE EXPENSE
  OFFICE_EXPENSE: "/expenses/office",
  EDIT_OFFICE_EXPENSE: "/expenses/office/:expenseId/edit",
  ADD_OFFICE_EXPENSE: "/expenses/office/add",

  // DRIVER EXPENSE
  DRIVER_EXPENSE: "/expenses/driver",
  EDIT_DRIVER_EXPENSE: "/expenses/driver/:expenseId/edit",
  ADD_DRIVER_EXPENSE: "/expenses/driver/add",

  // VEHICLE EXPENSE
  VEHICLES_EXPENSE: "/expenses/vehicles",
  EDIT_VEHICLES_EXPENSE: "/expenses/vehicles/:expenseId/edit",
  ADD_VEHICLES_EXPENSE: "/expenses/vehicles/add",

  //CONFIGURATION
  CONFIGURATION: "/configuration",
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
    if (typeof val === "number") val = val.toString();
    return !val.toLowerCase().includes(search.toLowerCase());
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
