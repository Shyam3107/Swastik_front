const user = JSON.parse(sessionStorage.getItem("user"))

export const isAdmin = () => {
  return user && !user.addedBy
}

export const isOperationsAllowed = (operation) => {
  return isAdmin() || user?.operations.indexOf(operation).indexOf !== -1
}

export const isAccessAllowed = (access) => {
  return isAdmin() || user?.access.indexOf(access).indexOf !== -1
}
