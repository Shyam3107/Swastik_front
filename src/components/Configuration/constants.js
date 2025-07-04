import { access, operations } from "../../utils/utilities";

export const initialForm = {
  userName: "",
  password: "",
  phone: "",
  phone2: "",
  companyName: "",
  tptCode: "",
  documentsLink: "",
  access: [],
  operations: [],
  showTrips: "ALL",
  consignor: "",
  branch: "",
};

export const accessOptions = [
  { label: "Trips", id: access.TRIPS },
  { label: "Documents", id: access.DOCUMENTS },
  { label: "Vouchers", id: access.VOUCHERS },
  { label: "Receipts", id: access.RECEIPTS },
  { label: "Office Expenses", id: access.OFFICE_EXPENSES },
  { label: "Vehicle Expenses", id: access.VEHICLE_EXPENSES },
  { label: "Accounts", id: access.ACCOUNTS },
  { label: "Products", id: access.PRODUCTS },
  { label: "Logistics", id: access.LOGISTICS },
  { label: "Store Bills", id: access.STORE_BILLS },
  { label: "Fleets", id: access.FLEETS },
  { label: "Drivers", id: access.DRIVERS },
];

export const operationsOptions = [
  { label: "Read", id: operations.READ },
  { label: "Create", id: operations.CREATE },
  { label: "Update", id: operations.EDIT },
  { label: "Delete", id: operations.DELETE },
];

export const showTripsOptions = [
  { label: "All", value: "ALL" },
  { label: "Self", value: "SELF" },
];
