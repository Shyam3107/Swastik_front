export const header = [
  "Vehicle No.",
  "Tax Paid On",
  "Tax Paid Upto",
  "Insurance Paid On",
  "Insurance Paid Upto",
  "Fitness Paid On",
  "Fitness Paid Upto",
];

export const headerKey = [
  "vehicleNo",
  "taxPaidOn",
  "taxPaidUpto",
  "insurancePaidOn",
  "insurancePaidUpto",
  "fitnessPaidOn",
  "fitnessPaidUpto",
];

export const sampleData = [
  header,
  [
    "CG04MH7896",
    "10-09-2021",
    "31-12-2021",
    "05-09-2021",
    "04-09-2022",
    "06-09-2021",
    "05-09-2022",
  ],
  [
    "CG04MH5676",
    "10-09-2021",
    "31-12-2021",
    "23-09-2021",
    "22-09-2022",
    "06-09-2021",
    "05-09-2022",
  ],
];

export const EXPIRED = "EXPIRED";
export const ACTIVE = "ACTIVE";

export const EDIT_URL = (id) => `/vehicles/document/${id}/edit`;
