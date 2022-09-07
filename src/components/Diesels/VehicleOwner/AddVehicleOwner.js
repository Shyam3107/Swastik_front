import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import LayoutAdd from "../../Layout/LayoutAdd"
import {
  addVehicleOwner,
  editVehicleOwner,
} from "../../../containers/VehicleOwner/action"
import { ROUTES } from "../../../utils/constants"

const initialVehicleOwner = {
  vehicleNo: "",
  owner: "SELF",
  remarks: "",
}

const VehicleOwner = (props) => {
  const [fields, setFields] = useState(initialVehicleOwner)
  const { initialFields } = props
  const history = props.history
  let { loading } = props.vehicleOwner

  useEffect(() => {
    if (initialFields) setFields(initialFields)
  }, [initialFields])

  const inputFields = [
    { id: "vehicleNo", label: "Vehicle No.", required: true },
    {
      id: "owner",
      label: "Owner",
      required: true,
      type: "select",
      menuItems: [
        { label: "SELF", value: "SELF" },
        { label: "MARKET", value: "MARKET" },
      ],
    },
    { id: "remarks", label: "Remarks" },
  ]

  const handleValueChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  const handleCancel = () => {
    history.push(ROUTES.VEHICLES_OWNER)
  }

  const handleReset = () => {
    if (initialFields) setFields(initialFields)
    else setFields(initialVehicleOwner)
  }

  const handleSubmit = () => {
    const cb = () => {
      history.push(ROUTES.VEHICLES_OWNER)
    }
    if (initialFields) props.editVehicleOwner(fields, cb)
    else props.addVehicleOwner(fields, cb)
  }

  return (
    <LayoutAdd
      title="Vehicle Owner"
      inputFields={inputFields}
      handleValueChange={handleValueChange}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      data={fields}
      loading={loading}
      edit={initialFields ? true : false}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    vehicleOwner: state.vehicleOwner,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addVehicleOwner,
    editVehicleOwner,
  })(VehicleOwner)
)
