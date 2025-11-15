import { includesInArray, hostRoutes } from "../../utils/constants";

export const header = ["Vehicle No.", "Driver", "Driver Joining Date"];

export const headerKey = ["vehicleNo", "driver", "driverJoiningDate"];

export const filterData = (data, search) => {
  if (!data || !Array.isArray(data)) data = [];
  return data.filter((val) => {
    search = search?.toLowerCase();
    switch (search) {
      default:
        return includesInArray(
          [val.vehicleNo, val.driver, val.joiningDate],
          search
        );
    }
  });
};

export const EDIT_URL = (id) => `${hostRoutes.DRIVERS}/${id}/edit`;
