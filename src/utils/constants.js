import moment from "moment"

export const error = "error"
export const success = "success"
export const warn = "warn"

export const monthStart = moment().startOf("month")
export const monthEnd = moment().endOf("month")
export const yearEnd = moment().endOf("year")
export const currentDate = moment().endOf("day")

export const pumpNames = ["Saurabh Fuels", "Saudimini Fuels", "Lal Fuels"]

export const hostRoutes = {
  TRIPS: "/vehicles/trips",
  DOCUMENTS: "/vehicles/documents",
  VOUCHERS: "/vehicles/vouchers",
  DIESELS: "/diesels/pumpDiesel",
  VEHICLES_OWNER: "/diesels/vehiceOwner",
  OFFICE_EXPENSE: "/expenses/office",
  DRIVER_EXPENSE: "/expenses/driver",
  VEHICLES_EXPENSE: "/expenses/vehicles",
  RECEIPT: "/receipt",
  PRODUCTS: "/stores/products",
  LOGISTICS: "/stores/logistics",
  HARDWARE_SHOP_BILL: "/store/hardwareShopBill",
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

  // VEHICLE OWNER
  VEHICLES_OWNER: hostRoutes.VEHICLES_OWNER,
  ADD_VEHICLE_OWNER: hostRoutes.VEHICLES_OWNER + "/add",
  EDIT_VEHICLE_OWNER: hostRoutes.VEHICLES_OWNER + "/:vehicleNo/edit",

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

  // PRODUCT
  PRODUCT: hostRoutes.PRODUCTS,
  EDIT_PRODUCT: hostRoutes.PRODUCTS + "/:productId/edit",
  ADD_PRODUCT: hostRoutes.PRODUCTS + "/add",
  VIEW_PRODUCT: hostRoutes.PRODUCTS + "/:productId/",

  // LOGISTIC
  LOGISTIC: hostRoutes.LOGISTICS,
  EDIT_LOGISTIC: hostRoutes.LOGISTICS + "/:logisticId/edit",
  ADD_LOGISTIC: hostRoutes.LOGISTICS + "/add",

  // HARDWARE SHOPS BILLS
  HARDWARE_SHOP_BILL: hostRoutes.HARDWARE_SHOP_BILL,
  EDIT_HARDWARE_SHOP_BILL: hostRoutes.HARDWARE_SHOP_BILL + "/:billId/edit",
  VIEW_HARDWARE_SHOP_BILL_BY_SHOP:
    hostRoutes.HARDWARE_SHOP_BILL + "/shop/:shopName",
  VIEW_HARDWARE_SHOP_BILL_BY_VEHICLE:
    hostRoutes.HARDWARE_SHOP_BILL + "/vehicle/:vehicleNo",
  ADD_HARDWARE_SHOP_BILL: hostRoutes.HARDWARE_SHOP_BILL + "/add",

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
