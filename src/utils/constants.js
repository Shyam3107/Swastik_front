import moment from "moment";

export const error = "error";
export const success = "success";
export const warn = "warn";

export const monthStart = moment().startOf("month");
export const monthEnd = moment().endOf("month");
export const currentDate = moment();

export const ROUTES = {
  //LOGIN
  LOGIN: "/login",

  //LOGOUT
  LOGOUT: "/logout",

  //HOME
  HOME: "/home",

  //TRIPS
  TRIPS: "/vehicles/trips",
  ADD_TRIP: "/vehicles/trips/add",

  //DOCUMENTS
  DOCUMENTS: "/vehicles/documents",
  VIEW_DOCUMENT: "/vehicles/document/:vehicleNo",
  EDIT_DOCUMENT: "/vehicles/document/:vehicleNo/edit",
  ADD_DOCUMENT: "/vehicles/document/add",

  VEHICLES: "/vehicles",
  PLACES: "/places",
  ADVANCE: "/advance",
};

export const formatDate = (date, time = false) => {
  try {
    if (time) return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    else return moment(date).format("Do MMMM YYYY");
  } catch (error) {
    return "InValid Date";
  }
};

export const formatDateInDDMMYYY = (date) => {
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
