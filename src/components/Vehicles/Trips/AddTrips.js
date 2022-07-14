import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import LayoutAdd from "../../Layout/LayoutAdd"
import { ROUTES, pumpNames } from "../../../utils/constants"
import { addTrips, editTrips } from "../../../containers/Trips/action"

const initialTrip = {
  diNo: "",
  lrNo: "",
  date: new Date().toISOString(),
  loadingPoint: "",
  partyName: "",
  location: "",
  material: "Cement",
  vehicleNo: "",
  quantity: 0,
  driverName: "",
  driverPhone: "",
  diesel: "",
  dieselIn: "",
  pumpName: "",
  cash: undefined,
  remarks: "",
}

const AddTrips = (props) => {
  const [trip, setTrip] = useState(initialTrip)
  const { initialFields } = props
  const history = props.history
  const { addLoading, editLoading, loading } = props.trips

  useEffect(() => {
    if (initialFields) setTrip(initialFields)
  }, [initialFields])

  const inputFields = [
    { id: "diNo", type: "number", label: "DI No.", required: true },
    { id: "lrNo", label: "LR No.", required: true },
    {
      id: "date",
      type: "date",
      handleChange: (date) => setTrip({ ...trip, date }),
      label: "Date",
      maxDate: new Date().toISOString(),
    },
    {
      id: "loadingPoint",
      label: "Loading Point",
      type: "customSelect",
      handleChange: (val) => setTrip({ ...trip, loadingPoint: val }),
      options: ["Hirmi", "Tilda", "Grasim", "Shree Cement", "Ambuja"],
      required: true,
    },
    { id: "partyName", label: "Party Name", required: true },
    { id: "location", label: "Location", required: true },
    { id: "vehicleNo", label: "Vehicle No.", required: true },
    { id: "quantity", type: "number", label: "Quantity", required: true },
    {
      id: "material",
      label: "Material",
      type: "customSelect",
      handleChange: (val) => setTrip({ ...trip, material: val }),
      options: ["Cement", "Coal", "Clinker", "Fly Ash"],
      required: true,
    },
    { id: "driverName", label: "Driver Name", required: true },
    {
      id: "driverPhone",
      type: "number",
      label: "Driver Phone No.",
      required: true,
      customValidate: [{ type: "PHONE" }],
    },
    { id: "diesel", type: "number", label: "Diesel" },
    {
      id: "dieselIn",
      label: "Diesel In",
      type: "select",
      menuItems: [
        { label: "Litre", value: "Litre" },
        { label: "Amount", value: "Amount" },
      ],
    },
    {
      id: "pumpName",
      label: "Pump Name",
      type: "customSelect",
      handleChange: (val) => setTrip({ ...trip, pumpName: val }),
      options: pumpNames,
    },
    { id: "cash", type: "number", label: "Cash" },
    { id: "remarks", label: "Remarks" },
  ]

  const handleValueChange = (e) => {
    if (e.target.name === "vehicleNo")
      e.target.value = e.target.value.toUpperCase()
    setTrip({ ...trip, [e.target.name]: e.target.value })
  }

  const handleCancel = () => {
    history.push(ROUTES.TRIPS)
  }

  const handleReset = () => {
    if (initialFields) setTrip(initialFields)
    else setTrip(initialTrip)
  }

  const handleSubmit = () => {
    const cb = () => {
      history.push(ROUTES.TRIPS)
    }
    if (initialFields) props.editTrips(trip, cb)
    else props.addTrips(trip, cb)
  }

  return (
    <LayoutAdd
      title="Trips"
      inputFields={inputFields}
      handleValueChange={handleValueChange}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      data={trip}
      loading={loading}
      submitLoading={addLoading || editLoading}
      edit={initialFields ? true : false}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
  }
}

export default withRouter(
  connect(mapStateToProps, { addTrips, editTrips })(AddTrips)
)
