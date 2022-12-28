import {
  formatDateInDDMMYYY,
  yearEnd,
  includesInArray,
  hostRoutes,
} from "../../../utils/constants"

export const header = [
  "Vehicle No.",
  "Tax Paid Upto",
  "Insurance Paid Upto",
  "Fitness Paid Upto",
  "Pollution Paid Upto",
  "Permit Paid Upto",
  "National Permit Paid Upto",
  "Is National Permit"
]

export const headerKey = [
  "vehicleNo",
  "taxPaidUpto",
  "insurancePaidUpto",
  "fitnessPaidUpto",
  "pollutionPaidUpto",
  "permitPaidUpto",
  "nationalPermitPaidUpto",
  "isNationalPermit"
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
    "YES"
  ],
  [
    "CG04MH5676",
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    "NO"
  ],
]

export const EXPIRED = "Expired"
export const ACTIVE = "Active"
export const daysLeft = (days) => `${days} Days`

export const EDIT_URL = (id) => `${hostRoutes.DOCUMENTS}/${id}/edit`
export const VIEW_URL = (id) => `${hostRoutes.DOCUMENTS}/${id}`

export const tableHeader = [
  "Vehicle No.",
  "Tax Status",
  "Insurance Status",
  "Fitness Status",
  "Pollution",
  "Permit",
  "National Permit",
  "Is National Permit"
]

export const tableHeaderKey = [
  "vehicleNo",
  "taxStatus",
  "insuranceStatus",
  "fitnessStatus",
  "pollutionStatus",
  "permitStatus",
  "nationalPermitStatus",
  "isNationalPermit"
]

export const filterData = (data, search) => {
  if (!data || !Array.isArray(data)) data = []
  return data.filter((val) => {
    search = search?.toLowerCase()
    switch (search) {
      // For Expired
      case "tax expired":
        return includesInArray([val?.taxStatus], EXPIRED)

      case "insurance expired":
        return includesInArray([val?.insuranceStatus], EXPIRED)

      case "permit expired":
        return includesInArray([val?.permitStatus], EXPIRED)

      case "pollution expired":
        return includesInArray([val?.pollutionStatus], EXPIRED)

      case "fitness expired":
        return includesInArray([val?.fitnessStatus], EXPIRED)

      case "national permit expired":
        return includesInArray([val?.nationalPermitStatus], EXPIRED)

      // For Active
      case "tax active":
        return includesInArray([val?.taxStatus], ACTIVE)

      case "insurance active":
        return includesInArray([val?.insurancetatus], ACTIVE)

      case "permit active":
        return includesInArray([val?.permitStatus], ACTIVE)

      case "pollution active":
        return includesInArray([val?.pollutionStatus], ACTIVE)

      case "fitness active":
        return includesInArray([val?.fitnessStatus], ACTIVE)

      case "national permit active":
        return includesInArray([val?.nationalPermitStatus], ACTIVE)

      default:
        return includesInArray(
          [
            val.vehicleNo,
            val?.addedBy,
            val?.taxStatus,
            val?.insutanceStatus,
            val?.fitnessStatus,
            val?.pollutionStatus,
            val?.permitStatus,
            val?.isNationalPermit
          ],
          search
        )
    }
  })
}
