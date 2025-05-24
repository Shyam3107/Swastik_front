import { includesInArray, hostRoutes } from "../../utils/constants";

export const header = [
  "Vehicle No.",
  "Owner",
  "Owner Name",
  "Remarks",
  "Driver-DL No",
  "Driver Joining Date",
];

export const headerKey = [
  "vehicleNo",
  "owner",
  "ownerName",
  "remarks",
  "driver",
  "driverJoiningDate",
];

export const sampleData = [
  ["Vehicle No.", "Owner", "Owner Name"],
  ["CG04PD1280", "SELF", ""],
  ["CG04MJ9741", "ATTACHED", "YADU"],
];

export const filterData = (data, search) => {
  if (!data || !Array.isArray(data)) data = [];
  return data.filter((val) => {
    return includesInArray(
      [
        val.vehicleNo,
        val.owner,
        val?.ownerName ?? "",
        val?.addedBy?.location ?? "",
      ],
      search
    );
  });
};

export const EDIT_URL = (id) => `${hostRoutes.FLEETS}/${id}/edit`;
