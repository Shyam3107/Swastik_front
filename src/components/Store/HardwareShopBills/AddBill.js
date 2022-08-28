import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import LayoutAdd from "../../Layout/LayoutAdd"
import {
  addBills,
  editBills,
} from "../../../containers/HardwareShopBills/action"
import { ROUTES } from "../../../utils/constants"

const initialBill = {
  date: new Date().toISOString(),
  vehicleNo: "",
  amount: "1",
  shopName: "",
  remarks: "",
}

const Bill = (props) => {
  const [form, setForm] = useState(initialBill)
  const { initialFields } = props
  const history = props.history
  let { loading } = props.bills

  useEffect(() => {
    if (initialFields) setForm(initialFields)
  }, [initialFields])

  const inputFields = [
    {
      id: "date",
      type: "date",
      handleChange: (date) => setForm({ ...form, date }),
      label: "Date",
      maxDate: new Date().toISOString(),
    },
    { id: "vehicleNo", label: "Vehicle No.", required: true },
    { id: "amount", label: "Amount", type: "number", required: true },
    {
      id: "shopName",
      label: "Shop Name",
      type: "customSelect",
      handleChange: (val) => setForm({ ...form, shopName: val }),
      options: ["a", "b"],
    },
    { id: "remarks", label: "Remarks", required: true },
  ]

  const handleValueChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCancel = () => {
    history.push(ROUTES.HARDWARE_SHOP_BILL)
  }

  const handleReset = () => {
    if (initialFields) setForm(initialFields)
    else setForm(initialBill)
  }

  const handleSubmit = () => {
    const cb = () => {
      history.push(ROUTES.HARDWARE_SHOP_BILL)
    }
    if (initialFields) props.editBills(form, cb)
    else props.addBills(form, cb)
  }

  return (
    <LayoutAdd
      title="Bills"
      inputFields={inputFields}
      handleValueChange={handleValueChange}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      data={form}
      loading={loading}
      edit={initialFields ? true : false}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    bills: state.hardwareShopBills,
    user: state.user,
  }
}

export default withRouter(
  connect(mapStateToProps, { addBills, editBills })(Bill)
)
