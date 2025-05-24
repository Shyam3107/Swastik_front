export const user = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

export const operations = {
  READ: "READ",
  CREATE: "CREATE",
  EDIT: "UPDATE",
  DELETE: "DELETE",
};

export const access = {
  DOCUMENTS: "DOCUMENTS",
  TRIPS: "TRIPS",
  VOUCHERS: "VOUCHERS",
  DIESELS: "DIESELS",
  VEHICLE_OWNER: "VEHICLE_OWNER",
  RECEIPTS: "RECEIPTS",
  OFFICE_EXPENSES: "OFFICE EXPENSES",
  VEHICLE_EXPENSES: "VEHICLE EXPENSES",
  ACCOUNTS: "ACCOUNTS",
  PRODUCTS: "PRODUCTS",
  LOGISTICS: "LOGISTICS",
  STORE_BILLS: "STORE_BILLS",
  FLEETS: "FLEETS",
  DRIVERS: "DRIVERS",
};

export const checkBoxCondition = (row) => {
  return (
    row?.addedBy?._id === user()?._id ||
    row?.addedBy === user()?.location ||
    isAdmin()
  );
};

export const isAdmin = () => {
  return user()?._id === user()?.companyAdminId._id;
};

export const isOperationAllowed = (acc, operation = false, data = false) => {
  if (isAdmin()) return true;
  let isCreator = true;
  let accessGiven = user()?.access.indexOf(acc) !== -1;
  let operationGiven = user()?.operations.indexOf(operation) !== -1;

  if (!operation) {
    return accessGiven || acc === access.DOCUMENTS;
  }

  // Only creator can edit and delete
  if (
    data &&
    (operation === operations.EDIT || operation === operations.DELETE)
  ) {
    isCreator = user()._id === data?.addedBy?._id;
  }
  if (acc === access.DOCUMENTS && operation === operations.READ) return true;

  return accessGiven && operationGiven && isCreator;
};

// Return an object with id, label and value
export const getLabelIdValue = (label = "", id = "", value = null) => {
  return { label, id, value };
};
