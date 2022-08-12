import { formatDateInDDMMYYY } from "../../../utils/constants"

export const header = [
  "Date",
  "Vehicle No.",
  "Quantity",
  "Amount",
  "Fuel",
  "Pump Name",
  "Remarks",
]

export const headerKey = [
  "date",
  "vehicleNo",
  "quantity",
  "amount",
  "fuel",
  "pumpName",
  "remarks",
]

export const sampleData = [
  header,
  [
    formatDateInDDMMYYY(),
    "CG04JD1050",
    "32",
    "3450.25",
    "Diesel",
    "Saurabh Fuels",
    "Cash",
  ],
  [formatDateInDDMMYYY(), "CG04JD1051", "22", "2450.25", "Petrol", "H.H Fuels"],
]

export const EDIT_URL = (id) => `/vehicles/diesels/${id}/edit`