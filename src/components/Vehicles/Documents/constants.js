import { formatDateInDDMMYYY, yearEnd } from "../../../utils/constants"

export const header = [
  "Vehicle No.",
  "Tax Paid On",
  "Tax Paid Upto",
  "Insurance Paid On",
  "Insurance Paid Upto",
  "Fitness Paid On",
  "Fitness Paid Upto",
  "Pollution Paid On",
  "Pollution Paid Upto",
]

export const headerKey = [
  "vehicleNo",
  "taxPaidOn",
  "taxPaidUpto",
  "insurancePaidOn",
  "insurancePaidUpto",
  "fitnessPaidOn",
  "fitnessPaidUpto",
  "pollutionPaidOn",
  "pollutionPaidUpto",
]

export const sampleData = [
  header,
  [
    "CG04MH7896",
    formatDateInDDMMYYY(),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(),
    formatDateInDDMMYYY(yearEnd),
    "https://google.com",
  ],
  [
    "CG04MH5676",
    formatDateInDDMMYYY(),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(),
    formatDateInDDMMYYY(yearEnd),
  ],
]

export const EXPIRED = "EXPIRED"
export const ACTIVE = "ACTIVE"

export const EDIT_URL = (id) => `/vehicles/document/${id}/edit`
export const VIEW_URL = (id) => `/vehicles/document/${id}`

export const tableHeader = [
  "Vehicle No.",
  "Tax Status",
  "Insurance Status",
  "Fitness Status",
  "Pollution",
  "Documents Link",
]

export const tableHeaderKey = [
  "vehicleNo",
  "taxStatus",
  "insuranceStatus",
  "fitnessStatus",
  "pollutionStatus",
  "googleDriveLink",
]
