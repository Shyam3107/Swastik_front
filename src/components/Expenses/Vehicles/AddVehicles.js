import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import LayoutAdd from "../../Layout/LayoutAdd"
import {
  addExpense,
  editExpense,
} from "../../../containers/VehicleExpense/action"
import { ROUTES, pumpNames } from "../../../utils/constants"

const initialExpense = {
  date: new Date().toISOString(),
  vehicleNo: "",
  driverName: "",
  amount: 0,
  remarks: "",
  pumpName: "",
  diesel: "",
  dieselIn: "",
  dieselFor: "",
}

const Vehicles = (props) => {
  const [expense, setExpense] = useState(initialExpense)
  const { initialFields } = props
  const history = props.history
  const { loading } = props.vehiclesExpense

  useEffect(() => {
    if (initialFields) setExpense(initialFields)
  }, [initialFields])

  const inputFields = [
    {
      id: "date",
      type: "date",
      handleChange: (date) => setExpense({ ...expense, date }),
      label: "Date",
      maxDate: new Date().toISOString(),
    },
    { id: "vehicleNo", label: "Vehicle No.", required: true },
    { id: "driverName", label: "Driver Name", required: true },
    { id: "amount", type: "number", label: "Amount", required: true },
    { id: "remarks", label: "Remarks", required: true },
    { id: "diesel", type: "number", label: "Diesel" },
    {
      id: "dieselIn",
      label: "Diesel In",
      type: "select",
      menuItems: [
        { label: "None", value: "" },
        { label: "Litre", value: "Litre" },
        { label: "Amount", value: "Amount" },
      ],
    },
    {
      id: "dieselFor",
      label: "Diesel For",
      type: "select",
      menuItems: [
        { label: "Driver", value: "Driver" },
        { label: "Vehicle", value: "Vehicle" },
      ],
    },
    {
      id: "pumpName",
      label: "Pump Name",
      type: "customSelect",
      handleChange: (val) => setExpense({ ...expense, pumpName: val }),
      options: pumpNames,
    },
  ]

  const handleValueChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value })
  }

  const handleCancel = () => {
    history.push(ROUTES.VEHICLES_EXPENSE)
  }

  const handleReset = () => {
    if (initialFields) setExpense(initialFields)
    else setExpense(initialExpense)
  }

  const handleSubmit = () => {
    const cb = () => {
      history.push(ROUTES.VEHICLES_EXPENSE)
    }
    if (initialFields) props.editExpense(expense, cb)
    else props.addExpense(expense, cb)
  }

  return (
    <LayoutAdd
      title="Vehicle Expenses"
      inputFields={inputFields}
      handleValueChange={handleValueChange}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      data={expense}
      loading={loading}
      edit={initialFields ? true : false}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    vehiclesExpense: state.vehiclesExpense,
    user: state.user,
  }
}

export default withRouter(
  connect(mapStateToProps, { addExpense, editExpense })(Vehicles)
)
