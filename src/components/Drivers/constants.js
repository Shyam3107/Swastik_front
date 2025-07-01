import { includesInArray, hostRoutes } from "../../utils/constants";

export const header = [
  "Name",
  "Driver Phone",
  "Aadhar Card No",
  "Aadhar Card DOB",
  "DL No",
  "DL DOB",
  "DL Validity",
  "Home Phone",
  "Relation",
  "Guarantor",
  "Remarks",
  "Is Driving",
  "Defaulter",
];

export const sampleData = [
  header,
  [
    "Anil Sharma",
    "9876543210",
    "123456789101",
    "01-01-1990",
    "DL1234567890",
    "01-01-1990",
    "01-01-2035",
    "8745698563",
    "Father",
    "",
    "No remarks",
    "Yes",
    "No",
  ],
];

export const headerKey = [
  "name",
  "driverPhone",
  "aadharCardNo",
  "aadharCardDOB",
  "dlNo",
  "dlDOB",
  "dlValidity",
  "homePhone",
  "relation",
  "guarantor",
  "remarks",
  "isDriving",
  "defaulter",
];

export const filterData = (data, search) => {
  if (!data || !Array.isArray(data)) data = [];
  return data.filter((val) => {
    return includesInArray(
      [val.name, val.dlNo, val.aadharCardNo, val.driverPhone],
      search
    );
  });
};

export const EDIT_URL = (id) => `${hostRoutes.DRIVERS}/${id}/edit`;
