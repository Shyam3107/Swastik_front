import { formatDateInDDMMYYY } from "../../../utils/constants";

export const header = [
  "DI No.",
  "LR No.",
  "Date",
  "Loading Point",
  "Party Name",
  "Location",
  "Vehicle No.",
  "Quantity",
  "Driver Name",
  "Driver Phone",
  "Diesel",
  "Diesel In",
  "Pump Name",
  "Cash",
  "Remarks",
];

export const headerKey = [
  "diNo",
  "lrNo",
  "date",
  "loadingPoint",
  "partyName",
  "location",
  "vehicleNo",
  "quantity",
  "driverName",
  "driverPhone",
  "diesel",
  "dieselIn",
  "pumpName",
  "cash",
  "remarks",
];

export const sampleData = [
  header,
  [
    "6123457890",
    "1452369874",
    formatDateInDDMMYYY(),
    "Tilda",
    "Durg",
    "Hirmi",
    "CG04JD1050",
    "25",
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
    "Mahesh",
    "9898512314",
    "5000",
    "Amount",
    "Saurabh Fuels",
    "2000",
    "Food",
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
    "Mahesh",
    "9898512314",
    "5000",
    "Amount",
    "Saurabh Fuels",
    "",
    "",
  ],
];

export const EDIT_URL = (id) => `/vehicles/trips/${id}/edit`;
export const VIEW_URL = (id) => `/vehicles/trips/${id}`;