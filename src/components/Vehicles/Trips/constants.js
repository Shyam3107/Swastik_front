import {
  formatDateInDDMMYYY,
  hostRoutes,
  includesInArray,
} from "../../../utils/constants"

export const header = [
  "DI No.",
  "LR No.",
  "Date",
  "Loading Point",
  "Party Name",
  "Location",
  "Vehicle No.",
  "Quantity",
  "Bags",
  "Material",
  "Shortage",
  "Shortage Amount",
  "Driver Name",
  "Driver Phone",
  "Diesel",
  "Diesel In",
  "Pump Name",
  "Cash",
  "Remarks",
  "Billing Rate",
  "Rate",
]

export const headerKey = [
  "diNo",
  "lrNo",
  "date",
  "loadingPoint",
  "partyName",
  "location",
  "vehicleNo",
  "quantity",
  "bags",
  "material",
  "shortage",
  "shortageAmount",
  "driverName",
  "driverPhone",
  "diesel",
  "dieselIn",
  "pumpName",
  "cash",
  "remarks",
  "billingRate",
  "rate",
]

export const sampleData = [
  [
    ...header
  ],
  [
    "6123457890",
    "1452369874",
    formatDateInDDMMYYY(),
    "Tilda",
    "Durg",
    "Hirmi",
    "CG04JD1050",
    "25",
    "500",
    "Cement",
    "",
    "",
    "Ashok",
    "9993652140",
    "50",
    "Litre",
    "Saudimini Fuels",
    "1000",
    "Advance",
  ],
  [
    "6123547890",
    "1425369874",
    formatDateInDDMMYYY(),
    "Tilda",
    "Raigarh",
    "Grasim",
    "CG04JD1051",
    "30",
    "600",
    "Coal",
    "1.3",
    "5000",
    "Mahesh",
    "9898512314",
    "5000",
    "Amount",
    "Saurabh Fuels",
    "2000",
    "Food",
    "1000",
    "970",
  ],
  [
    "4523547890",
    "1425369874",
    formatDateInDDMMYYY(),
    "Tilda",
    "Raigarh",
    "Grasim",
    "CG04JD1051",
    "30",
    "600",
    "Coal",
    "0",
    "0",
    "Mahesh",
    "9898512314",
    "",
    "",
    "",
    "2000",
    "Food",
  ],
  [
    "5896547890",
    "1425369874",
    formatDateInDDMMYYY(),
    "Tilda",
    "Raigarh",
    "Grasim",
    "CG04JD1051",
    "30",
    "600",
    "Flyash",
    "0.4",
    "500",
    "Mahesh",
    "9898512314",
    "5000",
    "Amount",
    "Saurabh Fuels",
    "",
    "",
    "1190",
    "1100",
  ],
]

export const sampleData2 = [
  [
    "DI No.",
    "Date",
    "Vehicle No.",
    "Billing Rate",
    "Rate"
  ],
  [
    "67282892822",
    formatDateInDDMMYYY(),
    "CG04PD1281",
    1400,
    1450
  ],
  [
    "672824520001",
    formatDateInDDMMYYY(),
    "CG04NH9534",
    818,
    858
  ]
]

export const filterData = (data, search) => {
  if (!data || !Array.isArray(data)) data = []
  return data.filter((val) => {
    return includesInArray(
      [
        val.diNo,
        val.lrNo,
        val.partyName,
        val.location,
        val.vehicleNo,
        val.material,
        val.driverName,
        val?.pumpName ?? "",
        val.loadingPoint,
        val?.shortage ?? "",
        val?.shortageAmount ?? "",
        val?.addedBy ?? "",
      ],
      search
    )
  })
}

export const EDIT_URL = (id) => `${hostRoutes.TRIPS}/${id}/edit`
export const VIEW_URL = (id) => `${hostRoutes.TRIPS}/${id}`
export const VIEW_VEHICLE_URL = (id) => `${hostRoutes.TRIPS}/vehicle/${id}`
