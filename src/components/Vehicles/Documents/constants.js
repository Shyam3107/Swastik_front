import { formatDateInDDMMYYY, yearEnd } from "../../../utils/constants"

export const header = [
  "Vehicle No.",
  "Tax Paid Upto",
  "Insurance Paid Upto",
  "Fitness Paid Upto",
  "Pollution Paid Upto",
  "Permit Paid Upto",
  "National Permit Paid Upto",
]

export const headerKey = [
  "vehicleNo",
  "taxPaidUpto",
  "insurancePaidUpto",
  "fitnessPaidUpto",
  "pollutionPaidUpto",
  "permitPaidUpto",
  "nationalPermitPaidUpto",
]

export const sampleData = [
  header,
  [
    "CG04MH7896",
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
  ],
  [
    "CG04MH5676",
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
  ],
]

export const EXPIRED = "EXPIRED"
export const ACTIVE = "ACTIVE"
export const daysLeft = (days) => `${days}Days`

export const EDIT_URL = (id) => `/vehicles/document/${id}/edit`
export const VIEW_URL = (id) => `/vehicles/document/${id}`

export const tableHeader = [
  "Vehicle No.",
  "Tax Status",
  "Insurance Status",
  "Fitness Status",
  "Pollution",
  "Permit",
  "National Permit",
]

export const tableHeaderKey = [
  "vehicleNo",
  "taxStatus",
  "insuranceStatus",
  "fitnessStatus",
  "pollutionStatus",
  "permitStatus",
  "nationalPermitStatus",
]
