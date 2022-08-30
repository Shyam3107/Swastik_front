import {
  formatDateInDDMMYYY,
  includesInArray,
  hostRoutes,
} from "../../../utils/constants"

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

export const filterData = (data, search) => {
  if (!data || !Array.isArray(data)) data = []
  return data.filter((val) => {
    return includesInArray(
      [
        val.vehicleNo,
        val.quantity,
        val.amount,
        val.remarks,
        val.pumpName,
        val?.addedBy?.location ?? "",
      ],
      search
    )
  })
}

export const EDIT_URL = (id) => `${hostRoutes.DIESELS}/${id}/edit`
export const VIEW_PUMP_URL = (id) => `${hostRoutes.DIESELS}/pump/${id}`
export const VIEW_VEHICLE_URL = (id) => `${hostRoutes.DIESELS}/vehicle/${id}`
