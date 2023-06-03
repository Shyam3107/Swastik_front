import { ROUTES, includesInArray } from "../../utils/constants";

export const headerSite = ["Date", "Vehicle No.", "Location", "Debit", "Credit", "Remarks"]

export const headerKeySite = ["date", "vehicleNo", "location", "debit", "credit", "remarks"]

export const headerAllSite = ["Location", "Opening Balance", "Credit", "Debit", "Closing Balance", "Trips"]

export const headerKeyAllSite = ["location", "openingBalance", "periodCredit", "periodDebit", "closingBalance", "trips"]

export const filterData = (data, search) => {
  if (!data || !Array.isArray(data)) data = []
  return data.filter((val) => {
    return includesInArray(
      [val.remarks, val.vehicleNo, val.location, val.debit, val.credit],
      search
    )
  })
}

export const VIEW_OWN_REPORT = (id) => ROUTES.REPORTS + "/site/" + id

export const VIEW_ALL_SITE_EXPENSE = ROUTES.VIEW_ALL_SITE_REPORT