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
  ACCOUNTS: "ACCOUNTS",
}

export const checkBoxCondition = (row) => {
  return (
    row?.addedBy?._id === user?._id || user?._id === user?.companyAdminId?._id
  )
}

export const isAdmin = () => {
  return user && user._id === user.companyAdminId._id
}

export const isOperationAllowed = (acc, operation = false, data = false) => {
  let isCreator = true
  let accessGiven = user?.access.indexOf(acc) !== -1
  let operationGiven = user?.operations.indexOf(operation) !== -1

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
  if (acc === access.DOCUMENTS && operation === operations.READ) return true

  return isAdmin() || (accessGiven && operationGiven && isCreator)
}
