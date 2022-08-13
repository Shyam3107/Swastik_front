import { formatDateInDDMMYYY, includesInArray } from "../../utils/constants"

export const header = ["Date", "Amount", "Remarks"]

export const headerKey = ["date", "amount", "remarks"]

export const sampleData = [
  header,
  [formatDateInDDMMYYY(), "10000", "from Tilda"],
  [formatDateInDDMMYYY(), "50000", "ATM "],
]

export const filterData = (data = [], search = "") => {
  if (!data || !Array.isArray(data)) data = []
  return data.filter((val) => {
    return includesInArray(
      [val.remarks, val?.addedBy?.location ?? "", val.amount],
      search
    )
  })
}

export const EDIT_URL = (id) => `/receipt/${id}/edit`
