export const initialForm = {
  userName: "",
  location: "",
  password: "",
  phone: "",
  companyName: "",
  tptCode: "",
  documentsLink: "",
  access: [],
  operations: [],
  showTrips: "ALL",
}

export const accessOptions = [
  { label: "Trips", id: "TRIPS" },
  { label: "Documents", id: "DOCUMENTS" },
  { label: "Receipts", id: "RECEIPTS" },
  { label: "Office Expenses", id: "OFFICE EXPENSES" },
  { label: "Vehicle Expenses", id: "VEHICLE EXPENSES" },
  { label: "Accounts", id: "ACCOUNTS" },
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
