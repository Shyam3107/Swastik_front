import { formatDateInDDMMYYY } from "../../utils/constants";

export const header = ["Date", "Amount", "Remarks"];

export const headerKey = ["date", "amount", "remarks"];

export const sampleData = [
  header,
  [formatDateInDDMMYYY(), "10000", "from Tilda"],
  [formatDateInDDMMYYY(), "50000", "ATM "],
];

export const EDIT_URL = (id) => `/receipt/${id}/edit`;
