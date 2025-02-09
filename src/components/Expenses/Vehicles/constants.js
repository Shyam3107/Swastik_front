import { formatDateInDDMMYYY, includesInArray } from "../../../utils/constants";

export const header = [
  "Date",
  "Vehicle No.",
  "Driver Name",
  "Driver Phone",
  "Amount",
  "Remarks",
  "Expense For",
];

export const headerKey = [
  "date",
  "vehicleNo",
  "driverName",
  "driverPhone",
  "amount",
  "remarks",
  "expenseFor",
];

export const sampleData = [
  header,
  [
    formatDateInDDMMYYY(),
    "CG04KR5617",
    "Ashok",
    "9856321458",
    "5123",
    "Advance",
    "Driver",
  ],
  [
    formatDateInDDMMYYY(),
    "CG04JD1234",
    "Anwar",
    "8745621035",
    "5000",
    "Amount",
    "Vehicle",
  ],
];

export const filterData = (data = [], search = "") => {
  if (!data || !Array.isArray(data)) data = [];
  return data.filter((val) => {
    return includesInArray(
      [
        val.remarks,
        val.driverName,
        val.vehicleNo,
        val.amount,
        val?.addedBy ?? "",
      ],
      search
    );
  });
};

export const EDIT_URL = (id) => `/expenses/vehicles/${id}/edit`;
