const KeyValuePair = (key = "", value = "") => {
    return { key, value }
}

export const VEHICLE_NO = KeyValuePair("Vehicle No.", "vehicleNo")
export const TAX_PAID_UPTO = KeyValuePair("Tax Paid Upto", "taxPaidUpto")
export const INSURANCE_PAID_UPTO = KeyValuePair("Insurance Paid Upto", "insurancePaidUpto")
export const FITNESS_PAID_UPTO = KeyValuePair("Fitness Paid Upto", "fitnessPaidUpto")
export const POLLUTION_PAID_UPTO = KeyValuePair("Pollution Paid Upto", "pollutionPaidUpto")
export const PERMIT_PAID_UPTO = KeyValuePair("Permit Paid Upto", "permitPaidUpto")
export const NATIONAL_PERMIT_PAID_UPTO = KeyValuePair("National Permit Paid Upto", "nationalPermitPaidUpto")
export const IS_NATIONAL_PERMIT = KeyValuePair("Is National Permit", "isNationalPermit")