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

export const isOperationAllowed = (access, operation = false, data = false) => {
  let isCreator = true
  let accessGiven = isAdmin() || user?.access.indexOf(access) !== -1
  let operationGiven = isAdmin() || user?.operations.indexOf(operation) !== -1

  if (!operation) {
    return accessGiven
  }

  // Only creator can edit and delete
  if (
    data &&
    (operation === operations.EDIT || operation === operations.DELETE)
  ) {
    isCreator = user._id === data?.addedBy?._id
  }
  if (access === "DOCUMENTS" && operation === "READ") return true

  return accessGiven && operationGiven && isCreator
}
