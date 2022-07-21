import moment from "moment"

export const error = "error"
export const success = "success"
export const warn = "warn"

export const monthStart = moment().startOf("month")
export const monthEnd = moment().endOf("month")
export const yearEnd = moment().endOf("year")
export const currentDate = moment().endOf("day")

export const pumpNames = ["Saurabh Fuels", "Saudimini Fuels", "Lal Fuels"]

const hostRoutes = {
  TRIPS: "/vehicles/trips",
  DOCUMENTS: "/vehicles/documents",
  VOUCHERS: "/vehicles/vouchers",
  DIESELS: "/vehicles/diesels",
  OFFICE_EXPENSE: "/expenses/office",
  DRIVER_EXPENSE: "/expenses/driver",
  VEHICLES_EXPENSE: "/expenses/vehicles",
  RECEIPT: "/receipt",
}

export const ROUTES = {
  // LOGIN
  LOGIN: "/login",

  // LOGOUT
  LOGOUT: "/logout",

  // HOME
  HOME: "/home",

  // TRIPS
  TRIPS: hostRoutes.TRIPS,
  VIEW_TRIP: hostRoutes.TRIPS + "/:diNo",
  ADD_TRIP: hostRoutes.TRIPS + "/add",
  EDIT_TRIP: hostRoutes.TRIPS + "/:diNo/edit",

  // VOUCHERS
  VOUCHERS: hostRoutes.VOUCHERS,
  VIEW_VOUCHER: hostRoutes.VOUCHERS + "/:voucherId",
  ADD_VOUCHER: hostRoutes.VOUCHERS + "/add",
  EDIT_VOUCHER: hostRoutes.VOUCHERS + "/:voucherId/edit",

  // DOCUMENTS
  DOCUMENTS: hostRoutes.DOCUMENTS,
  VIEW_DOCUMENT: hostRoutes.DOCUMENTS + "/:vehicleNo",
  EDIT_DOCUMENT: hostRoutes.DOCUMENTS + "/:vehicleNo/edit",
  ADD_DOCUMENT: hostRoutes.DOCUMENTS + "/add",

  // DIESELS
  DIESELS: hostRoutes.DIESELS,
  ADD_DIESEL: hostRoutes.DIESELS + "/add",
  EDIT_DIESEL: hostRoutes.DIESELS + "/:dieselId/edit",

  // OFFICE EXPENSE
  OFFICE_EXPENSE: hostRoutes.OFFICE_EXPENSE,
  EDIT_OFFICE_EXPENSE: hostRoutes.OFFICE_EXPENSE + "/:expenseId/edit",
  ADD_OFFICE_EXPENSE: hostRoutes.OFFICE_EXPENSE + "/add",

  // DRIVER EXPENSE
  DRIVER_EXPENSE: hostRoutes.DRIVER_EXPENSE,
  EDIT_DRIVER_EXPENSE: hostRoutes.DRIVER_EXPENSE + "/:expenseId/edit",
  ADD_DRIVER_EXPENSE: hostRoutes.DRIVER_EXPENSE + "/add",

  // VEHICLE EXPENSE
  VEHICLES_EXPENSE: hostRoutes.VEHICLES_EXPENSE,
  EDIT_VEHICLES_EXPENSE: hostRoutes.VEHICLES_EXPENSE + "/:expenseId/edit",
  ADD_VEHICLES_EXPENSE: hostRoutes.VEHICLES_EXPENSE + "/add",

  // RECEIPT
  RECEIPT: hostRoutes.RECEIPT,
  EDIT_RECEIPT: hostRoutes.RECEIPT + "/:receiptId/edit",
  ADD_RECEIPT: hostRoutes.RECEIPT + "/add",

  //CONFIGURATION
  CONFIGURATION: "/configuration",

  // REPORTS
  REPORTS: "/reports",
}

export const formatDate = (date, time = false) => {
  try {
    if (time) return moment(date).format("MMMM Do YYYY, h:mm:ss a")
    else return moment(date).format("Do MMMM YYYY")
  } catch (error) {
    return "InValid Date"
  }
}

export const formatDateInDDMMYYY = (date = new Date()) => {
  try {
    return moment(date).format("DD-MM-YYYY")
  } catch (error) {
    return "InValid Date"
  }
}

export const includesInArray = (stringArray, search) => {
  let exist = stringArray.every((val) => {
    if (typeof val === "number") val = val?.toString()
    return !val?.toLowerCase()?.includes(search?.toLowerCase())
  })
  return !exist
}

export const formatInDayEnd = (date = moment()) => {
  try {
    return moment(date).endOf("day").toISOString()
  } catch (error) {
    return "InValid Date"
  }
}

export const validateUrlValid = (userInput) => {
  if (!userInput) return false
  var expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi

  let res = userInput.match(expression)
  return res ? true : false
}
