import { formatDateInDDMMYYY, includesInArray } from "../../../utils/constants"

export const header = ["Date", "Amount", "Remarks"]

export const headerKey = ["date", "amount", "remarks"]

export const sampleData = [
  header,
  [formatDateInDDMMYYY(), "1000", "Stationary"],
  [formatDateInDDMMYYY(), "2000", "RTO "],
]

export const filterData = (data = [], search = "") => {
  if (!data || !Array.isArray(data)) data = []
  return data.filter((val) => {
    return includesInArray(
      [val.remarks, val?.addedBy ?? "", val.amount],
      search
    )
  })
}

export const EDIT_URL = (id) => `/expenses/office/${id}/edit`
