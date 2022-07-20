import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import LayoutAdd from "../../Layout/LayoutAdd"
import { ROUTES } from "../../../utils/constants"
import { addVouchers, editVouchers } from "../../../containers/Vouchers/action"

const initialVoucher = {
  date: new Date().toISOString(),
  diNo: "",
  billingRate: 0,
  rate: 0,
  paidTo: "",
  accountNo: "",
  ifsc: "",
  cash: 0,
  diesel: 0,
  advance: 0,
  tds: 0,
  shortage: 0,
  other: 0,
  remarks: "",
}

const AddVouchers = (props) => {
  const [voucher, setVoucher] = useState(initialVoucher)
  const { initialFields } = props
  const history = props.history
  const { addLoading, editLoading, loading } = props.vouchers

  useEffect(() => {
    if (initialFields) setVoucher(initialFields)
  }, [initialFields])

  const inputFields = [
    {
      id: "date",
      type: "date",
      handleChange: (date) => setVoucher({ ...voucher, date }),
      label: "Date",
      maxDate: new Date().toISOString(),
    },
    { id: "diNo", type: "number", label: "DI No.", required: true },
    {
      id: "billingRate",
      type: "number",
      label: "Billing Rate",
      required: true,
    },
    { id: "rate", type: "number", label: "Rate", required: true },
    { id: "paidTo", label: "Paid To", required: true },
    { id: "accountNo", label: "Account No.", required: true },
    { id: "ifsc", label: "IFSC" },
    { id: "cash", type: "number", label: "Cash" },
    { id: "diesel", type: "number", label: "Diesel" },
    { id: "advance", type: "number", label: "Advance" },
    { id: "tds", type: "number", label: "TDS" },
    { id: "shortage", type: "number", label: "Shortage" },
    { id: "other", type: "number", label: "Other" },
    { id: "remarks", label: "Remarks" },
  ]

  const handleValueChange = (e) => {
    setVoucher({ ...voucher, [e.target.name]: e.target.value })
  }

  const handleCancel = () => {
    history.push(ROUTES.VOUCHERS)
  }

  const handleReset = () => {
    if (initialFields) setVoucher(initialFields)
    else setVoucher(initialVoucher)
  }

  const handleSubmit = () => {
    const cb = () => {
      history.push(ROUTES.VOUCHERS)
    }
    if (initialFields) props.editVouchers(voucher, cb)
    else props.addVouchers(voucher, cb)
  }

  return (
    <LayoutAdd
      title="Vouchers"
      inputFields={inputFields}
      handleValueChange={handleValueChange}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      data={voucher}
      loading={loading}
      submitLoading={addLoading || editLoading}
      edit={initialFields ? true : false}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    vouchers: state.vouchers,
  }
}

export default withRouter(
  connect(mapStateToProps, { addVouchers, editVouchers })(AddVouchers)
)
