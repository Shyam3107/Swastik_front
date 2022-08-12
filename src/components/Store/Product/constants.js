import { includesInArray } from "../../../utils/constants"

export const header = ["Name", "Quantity", "Remarks", "Added By"]

export const headerKey = ["name", "quantity", "remarks", "addedBy"]

export const sampleData = [
  ["Name", "Remarks"],
  ["Jack", ""],
  ["Washer 3mm", "This is 3mm"],
]

export const filterData = (data, search) => {
  if (!data || !Array.isArray(data)) data = []
  return data.filter((val) => {
    return includesInArray(
      [val.remarks, val.name, val?.addedBy?.location ?? ""],
      search
    )
  })
}

export const EDIT_URL = (id) => `/stores/products/${id}/edit`
export const VIEW_URL = (id) => `/stores/products/${id}`
