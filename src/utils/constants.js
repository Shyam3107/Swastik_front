import moment from "moment";

export const error = "error";
export const success = "success";
export const warn = "warn";

export const monthStart = moment().startOf("month");
export const monthEnd = moment().endOf("month");

export const ROUTES = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  TAX: "/tax",
  VEHICLES: "/vehicles",
  PLACES: "/places",
  HOME: "/home",
  ADVANCE: "/advance",
};

export const formatDate = (date) => {
  try {
    return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  } catch (error) {
    return "InValid Date";
  }
};
