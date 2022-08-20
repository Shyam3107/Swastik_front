import { includesInArray, hostRoutes } from "../../../utils/constants"

export const header = ["Vehicle No.", "Owner", "Remarks", "Added By"]

export const headerKey = ["vehicleNo", "owner", "remarks", "addedBy"]

export const sampleData = [
  ["Vehicle No.", "Owner", "Remarks"],
  ["7799", "SELF", "Baba bhaiya ki Gaadi"],
  ["3441", "MARKET"],
]

export const filterData = (data, search) => {
  if (!data || !Array.isArray(data)) data = []
  return data.filter((val) => {
    return includesInArray(
      [
        val.vehicleNo,
        val.owner,
        val?.remarks ?? "",
        val?.addedBy?.location ?? "",
      ],
      search
    )
  })
}

export const EDIT_URL = (id) => `${hostRoutes.VEHICLES_OWNER}/${id}/edit`
