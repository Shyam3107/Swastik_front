import { formatDateInDDMMYYY } from "../../../utils/constants";

export const header = [
  "Date",
  "Vehicle No.",
  "Driver Name",
  "Cash",
  "Remarks",
  "Pump Name",
  "Diesel",
  "Diesel In",
  "Diesel For",
];

export const headerKey = [
  "date",
  "vehicleNo",
  "driverName",
  "cash",
  "remarks",
  "pumpName",
  "diesel",
  "dieselIn",
  "dieselFor",
];

export const sampleData = [
  header,
  [formatDateInDDMMYYY(), "CG04KR5617", "Ashok", "5123", "Advance"],
  [
    formatDateInDDMMYYY(),
    "CG04JD1234",
    "Anwar",
    "0",
    "diesel",
    "Saurabh Fuels",
    "5000",
    "Amount",
    "Vehicle",
  ],
  [
    formatDateInDDMMYYY(),
    "CG04JD3456",
    "Ali",
    "0",
    "diesel",
    "Saurabh Fuels",
    "50",
    "Litre",
    "Driver",
  ],
];

export const EDIT_URL = (id) => `/expense/vehicles/${id}/edit`;
