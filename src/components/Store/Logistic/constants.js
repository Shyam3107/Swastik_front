import { formatDateInDDMMYYY, includesInArray } from "../../../utils/constants"

export const header = [
  "Date",
  "Product",
  "Quantity",
  "Vehicle No.",
  "Person Name",
  "Person Phone",
  "Status",
  "Remarks",
  "Added By",
]

export const headerKey = [
  "date",
  "product",
  "quantity",
  "vehicleNo",
  "personName",
  "personPhone",
  "status",
  "remarks",
  "addedBy",
]

export const sampleData = [
  [
    "Date",
    "Product",
    "Quantity",
    "Vehicle No.",
    "Person Name",
    "Person Phone",
    "Status",
    "Remarks",
  ],
  [
    formatDateInDDMMYYY(),
    "Jack",
    20,
    "KAMAL MOTOR",
    "Ramesh",
    4569874526,
    "RECEIVED",
    "This came from Kamal motors",
  ],
  [
    formatDateInDDMMYYY(),
    "Jack",
    2,
    "CG04JD3456",
    "Sureh",
    5264569874,
    "ISSUED",
    "",
  ],
]

export const filterData = (data, search) => {
  if (!data || !Array.isArray(data)) data = []
  return data.filter((val) => {
    return includesInArray(
      [
        val.remarks,
        val.vehicleNo,
        val.personName,
        val.status,
        val.product,
        val?.remarks ?? "",
        val.name,
        val?.addedBy?.location ?? "",
      ],
      search
    )
  })
}

export const EDIT_URL = (id) => `/stores/logistics/${id}/edit`
export const VIEW_PRODUCT_URL = (id) => `/stores/products/${id}`
