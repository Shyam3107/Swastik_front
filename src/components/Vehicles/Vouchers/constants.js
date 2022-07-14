import { formatDate, formatDateInDDMMYYY } from "../../../utils/constants"

export const header = [
  "Date",
  "DI No.",
  "Billing Rate",
  "Rate",
  "Paid To",
  "Account No.",
  "IFSC",
  "Cash",
  "Diesel",
  "Advance",
  "TDS",
  "Bag Shortage",
  "Total",
  "Remarks",
]

export const headerKey = [
  "date",
  "diNo",
  "billingRate",
  "rate",
  "paidTo",
  "accountNo",
  "ifsc",
  "cash",
  "diesel",
  "advance",
  "tds",
  "bagShortage",
  "total",
  "remarks",
]

export const sampleData = [
  header,
  [
    formatDateInDDMMYYY(),
    "365895489",
    "1007",
    "925",
    "Swastik",
    "312589964",
    "SBIN001470",
    "500",
    "521",
    "10000",
    "200",
    "500",
    "100000",
    "Trips",
  ],
  [
    formatDateInDDMMYYY(),
    "3658954f89",
    "1007",
    "925",
    "Swastik",
    "312589964",
    "SBIN001470",
    "",
    "",
    "344443",
    "",
    "",
    "10000",
    "Trips",
  ],
]

export const EDIT_URL = (id) => `/vehicles/vouchers/${id}/edit`
export const VIEW_URL = (id) => `/vehicles/vouchers/${id}`

export const viewMoreFields = (voucher) => {
  return [
    {
      id: "diDate",
      label: "DI Date",
      value: formatDate(voucher?.trip?.date),
    },
    {
      id: "vehicleNo",
      label: "Vehicle No.",
      value: voucher?.trip?.vehicleNo,
    },
    {
      id: "designation",
      label: "Designation",
      value: voucher?.trip?.location,
    },
    {
      id: "lrNo",
      label: "LR No.",
      value: voucher?.trip?.lrNo,
    },
    {
      id: "quantity",
      label: "Quantity",
      value: voucher?.trip?.quantity,
    },
    {
      id: "site",
      label: "Site",
      value: voucher?.trip?.addedBy?.branch,
    },
  ]
}
