export const initialForm = {
  userName: "",
  password: "",
  phone: "",
  companyName: "",
  tptCode: "",
  documentsLink: "",
  access: [],
  operations: [],
  showTrips: "ALL",
  consignor: "",
  branch: "",
}

export const accessOptions = [
  { label: "Trips", id: "TRIPS" },
  { label: "Documents", id: "DOCUMENTS" },
  { label: "Vouchers", id: "VOUCHERS" },
  { label: "Receipts", id: "RECEIPTS" },
  { label: "Office Expenses", id: "OFFICE EXPENSES" },
  { label: "Vehicle Expenses", id: "VEHICLE EXPENSES" },
  { label: "Accounts", id: "ACCOUNTS" },
  { label: "Products", id: "PRODUCTS" },
  { label: "Logistics", id: "LOGISTICS" },
]

export const operationsOptions = [
  { label: "Read", id: "READ" },
  { label: "Create", id: "CREATE" },
  { label: "Update", id: "UPDATE" },
  { label: "Delete", id: "DELETE" },
]

export const showTripsOptions = [
  { label: "All", value: "ALL" },
  { label: "Self", value: "SELF" },
]
