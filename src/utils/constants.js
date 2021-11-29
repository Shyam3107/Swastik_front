import moment from "moment";

export const error = "error";
export const success = "success";
export const warn = "warn";

export const monthStart = moment().startOf("month");
export const monthEnd = moment().endOf("month");
export const currentDate = moment();

export const ROUTES = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  TAX: "/tax",
  VEHICLES: "/vehicles",
  PLACES: "/places",
  HOME: "/home",
  ADVANCE: "/advance",
  TRIPS: "/vehicles/trips",
  ADD_TRIP: "/vehicles/trips/add",
};

export const formatDate = (date, time = false) => {
  try {
    if (time) return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    else return moment(date).format("Do MMMM YYYY");
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
