const user = JSON.parse(sessionStorage.getItem("user"))

export const operations = {
  READ: "READ",
  CREATE: "CREATE",
  EDIT: "UPDATE",
  DELETE: "DELETE",
}

export const access = {
  DOCUMENTS: "DOCUMENTS",
  TRIPS: "TRIPS",
  RECEIPTS: "RECEIPTS",
  OFFICE_EXPENSES: "OFFICE EXPENSES",
  VEHICLE_EXPENSES: "VEHICLE EXPENSES",
}

export const isAdmin = () => {
  return user && !user.addedBy
}

export const isOperationAllowed = (access, operation) => {
  if (access === "DOCUMENTS" && operation === "READ") return true

  let accessGiven = isAdmin() || user?.access.indexOf(access).indexOf !== -1
  let operationGiven =
    isAdmin() || user?.operations.indexOf(operation).indexOf !== -1
  return accessGiven && operationGiven
}
