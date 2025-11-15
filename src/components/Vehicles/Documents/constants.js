import {
  formatDateInDDMMYYY,
  yearEnd,
  includesInArray,
  hostRoutes,
} from "../../../utils/constants";
import {
  VEHICLE_NO,
  TAX_PAID_UPTO,
  INSURANCE_PAID_UPTO,
  FITNESS_PAID_UPTO,
  PERMIT_PAID_UPTO,
  POLLUTION_PAID_UPTO,
  NATIONAL_PERMIT_PAID_UPTO,
  IS_NATIONAL_PERMIT,
} from "../../../utils/Keywords";

export const header = [
  VEHICLE_NO.key,
  TAX_PAID_UPTO.key,
  INSURANCE_PAID_UPTO.key,
  FITNESS_PAID_UPTO.key,
  POLLUTION_PAID_UPTO.key,
  PERMIT_PAID_UPTO.key,
  NATIONAL_PERMIT_PAID_UPTO.key,
  IS_NATIONAL_PERMIT.key,
];

export const headerKey = [
  VEHICLE_NO.value,
  TAX_PAID_UPTO.value,
  INSURANCE_PAID_UPTO.value,
  FITNESS_PAID_UPTO.value,
  POLLUTION_PAID_UPTO.value,
  PERMIT_PAID_UPTO.value,
  NATIONAL_PERMIT_PAID_UPTO.value,
  IS_NATIONAL_PERMIT.value,
];

export const sampleData = [
  header,
  [
    "CG04MH7896",
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    "YES",
  ],
  [
    "CG04MH5676",
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    formatDateInDDMMYYY(yearEnd),
    "NO",
  ],
];

export const EXPIRED = "Expired";
export const ACTIVE = "Active";
export const daysLeft = (days) => `${days} Days`;

export const EDIT_URL = (id) => `${hostRoutes.DOCUMENTS}/${id}/edit`;
export const VIEW_URL = (id) => `${hostRoutes.DOCUMENTS}/${id}`;

export const tableHeader = [
  "Vehicle No.",
  "Tax Status",
  "Insurance Status",
  "Fitness Status",
  "Pollution",
  "Permit",
  "National Permit",
  "Is National Permit",
];

export const tableHeaderKey = [
  "vehicleNo",
  "taxStatus",
  "insuranceStatus",
  "fitnessStatus",
  "pollutionStatus",
  "permitStatus",
  "nationalPermitStatus",
  "isNationalPermit",
];

export const filterData = (data, search) => {
  if (!data || !Array.isArray(data)) data = [];
  return data.filter((val) => {
    search = search?.toLowerCase();
    switch (search) {
      // For Expired
      case "tax expired":
        return includesInArray([val?.taxStatus], EXPIRED);

      case "insurance expired":
        return includesInArray([val?.insuranceStatus], EXPIRED);

      case "permit expired":
        return includesInArray([val?.permitStatus], EXPIRED);

      case "pollution expired":
        return includesInArray([val?.pollutionStatus], EXPIRED);

      case "fitness expired":
        return includesInArray([val?.fitnessStatus], EXPIRED);

      case "national permit expired":
        return (
          includesInArray([val?.nationalPermitStatus], EXPIRED) &&
          includesInArray([val?.isNationalPermit], "YES")
        );

      // For Active
      case "tax active":
        return includesInArray([val?.taxStatus], ACTIVE);

      case "insurance active":
        return includesInArray([val?.insurancetatus], ACTIVE);

      case "permit active":
        return includesInArray([val?.permitStatus], ACTIVE);

      case "pollution active":
        return includesInArray([val?.pollutionStatus], ACTIVE);

      case "fitness active":
        return includesInArray([val?.fitnessStatus], ACTIVE);

      case "national permit active":
        return includesInArray([val?.nationalPermitStatus], ACTIVE);

      default:
        return includesInArray(
          [
            val.vehicleNo,
            val?.addedBy,
            val?.taxStatus,
            val?.insutanceStatus,
            val?.fitnessStatus,
            val?.pollutionStatus,
            val?.permitStatus,
            val?.isNationalPermit,
          ],
          search
        );
    }
  });
};
