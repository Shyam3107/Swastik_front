import {
  formatDateInDDMMYYY,
  hostRoutes,
  includesInArray,
} from "../../../utils/constants"

export const header = ["Date", "Vehicle No.", "Amount", "Shop Name", "Remarks"]

export const headerKey = ["date", "vehicleNo", "amount", "shopName", "remarks"]

export const sampleData = [
  ["Date", "Vehicle No.", "Amount", "Shop Name", "Remarks"],
  [formatDateInDDMMYYY(), "1050", "5000", "Annapurna", "Grease"],
  [formatDateInDDMMYYY(), "BR1292", "2000", "Manoj Body Parts", "Repairing"],
]

export const filterData = (data, search) => {
  if (!data || !Array.isArray(data)) data = []
  return data.filter((val) => {
    return includesInArray(
      [
        val?.remarks,
        val?.vehicleNo,
        val?.amount,
        val?.shopName,
        val?.remarks ?? "",
        val?.addedBy?.location ?? "",
      ],
      search
    )
  })
}

export const EDIT_URL = (id) => `${hostRoutes.HARDWARE_SHOP_BILL}/${id}/edit`
