import { formatDateInDDMMYYY, includesInArray } from "../../../utils/constants"

export const header = [
  "Date",
  "DI No.",
  "Paid To",
  "Account No.",
  "IFSC",
  "Diesel Rate",
  "TDS (%)",
  "Shortage",
  "Other",
  "Remarks",
  "Paid On",
]

export const headerKey = [
  "date",
  "diNo",
  "paidTo",
  "accountNo",
  "ifsc",
  "dieselRate",
  "tds",
  "shortage",
  "other",
  "remarks",
  "paidOn",
]

export const sampleData = [
  header,
  [
    formatDateInDDMMYYY(),
    "365895489",
    "Swastik",
    "312589964",
    "SBIN001470",
    "100.56",
    "2",
    "100",
    "200",
    "Trips",
    formatDateInDDMMYYY(),
  ],
  [
    formatDateInDDMMYYY(),
    "7658589559",
    "Swastik",
    "312589964",
    "SBIN001470",
    "100.56",
    "0",
    "",
    "",
    "Trips",
    formatDateInDDMMYYY(),
  ],
]

export const EDIT_URL = (id) => `/vehicles/vouchers/${id}/edit`
export const VIEW_URL = (id) => `/vehicles/vouchers/${id}`

export const filterData = (data, search) => {
  if (!data || !Array.isArray(data)) data = []
  return data.filter((val) => {
    return includesInArray(
      [
        val.diNo,
        val.paidTo,
        val.accountNo,
        val.ifsc,
        val.total,
        val.remarks,
        val.billingRate,
        val.rate,
        val.cash,
        val.vehicleNo,
        val.lrNo,
        val?.addedBy?.location,
      ],
      search
    )
  })
}

export const viewMoreFields = (val) => {
  return [
    {
      id: "cash",
      label: "Cash",
    },
    {
      id: "diesel",
      label: "Diesel",
    },
    {
      id: "billingRate",
      label: "Billing Rate",
    },
    {
      id: "rate",
      label: "Rate",
    },
    {
      id: "total",
      label: "Total",
    },
    {
      id: "diDate",
      label: "DI Date",
      value: formatDateInDDMMYYY(val?.diDate),
    },
    {
      id: "vehicleNo",
      label: "Vehicle No.",
    },
    {
      id: "designation",
      label: "Designation",
    },
    {
      id: "lrNo",
      label: "LR No.",
    },
    {
      id: "quantity",
      label: "Quantity",
    },
    {
      id: "site",
      label: "Site",
    },
  ]
}
