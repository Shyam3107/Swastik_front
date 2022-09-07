import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import LayoutAdd from "../../Layout/LayoutAdd"
import {
  addDiesel,
  editDiesel,
  getDieselPumpNames,
} from "../../../containers/Diesels/action"
import { ROUTES } from "../../../utils/constants"

const initialDiesel = {
  date: new Date().toISOString(),
  vehicleNo: "",
  quantity: 0,
  amount: 0,
  fuel: "Diesel",
  pumpName: "",
  remarks: "",
}

const AddDiesels = (props) => {
  const [diesel, setDiesel] = useState(initialDiesel)
  const { initialFields, getDieselPumpNames } = props
  const history = props.history
  const { loading, pumpNames } = props.diesels

  useEffect(() => {
    if (initialFields) setDiesel(initialFields)
  }, [initialFields])

  useEffect(() => {
    getDieselPumpNames()
  }, [getDieselPumpNames])

  const inputFields = [
    {
      id: "date",
      type: "date",
      handleChange: (date) => setDiesel({ ...diesel, date }),
      label: "Date",
      maxDate: new Date().toISOString(),
    },
    { id: "vehicleNo", label: "Vehicle No.", required: true },
    { id: "quantity", type: "number", label: "Quantity" },
    { id: "amount", type: "number", label: "Amount" },
    {
      id: "fuel",
      label: "Fuel",
      type: "select",
      value: diesel?.fuel ?? "Diesel",
      menuItems: [
        { label: "Diesel", value: "Diesel" },
        { label: "Petrol", value: "Petrol" },
      ],
    },
    {
      id: "pumpName",
      label: "Pump Name",
      type: "customSelect",
      handleChange: (val) => setDiesel({ ...diesel, pumpName: val }),
      options: pumpNames ?? [],
    },
    { id: "remarks", label: "Remarks" },
  ]

  const handleValueChange = (e) => {
    setDiesel({ ...diesel, [e.target.name]: e.target.value })
  }

  const handleCancel = () => {
    history.push(ROUTES.DIESELS)
  }

  const handleReset = () => {
    if (initialFields) setDiesel(initialFields)
    else setDiesel(initialDiesel)
  }

  const handleSubmit = () => {
    const cb = () => {
      history.push(ROUTES.DIESELS)
    }
    if (initialFields) props.editDiesel(diesel, cb)
    else props.addDiesel(diesel, cb)
  }

  return (
    <LayoutAdd
      title="Diesels"
      inputFields={inputFields}
      handleValueChange={handleValueChange}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      data={diesel}
      loading={loading}
      edit={initialFields ? true : false}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    diesels: state.diesels,
  }
}

export default withRouter(
  connect(mapStateToProps, { addDiesel, editDiesel, getDieselPumpNames })(
    AddDiesels
  )
)
