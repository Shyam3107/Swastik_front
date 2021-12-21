import { formatDateInDDMMYYY } from "../../../utils/constants";

export const header = ["Date", "Amount", "Remarks"];

export const headerKey = ["date", "amount", "remarks"];

export const sampleData = [
  header,
  [formatDateInDDMMYYY(), "1000", "Stationary"],
  [formatDateInDDMMYYY(), "2000", "RTO "],
];

export const EDIT_URL = (id) => `/expenses/office/${id}/edit`;
