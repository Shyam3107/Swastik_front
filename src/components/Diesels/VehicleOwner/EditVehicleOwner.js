import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { getVehicleOwner } from "../../../containers/VehicleOwner/action"
import AddVehicleOwner from "./AddVehicleOwner"

const VehicleOwner = (props) => {
  let { vehicleOwner } = props.vehicleOwner
  const params = useParams()
  const { getVehicleOwner } = props
  const { vehicleNo } = params

  useEffect(() => {
    getVehicleOwner({ vehicleNo })
  }, [vehicleNo, getVehicleOwner])

  if (vehicleOwner && Array.isArray(vehicleOwner)) vehicleOwner = null

  return <AddVehicleOwner initialFields={vehicleOwner} />
}

const mapStateToProps = (state) => {
  return {
    vehicleOwner: state.vehicleOwner,
    user: state.user,
  }
}

export default connect(mapStateToProps, { getVehicleOwner })(VehicleOwner)
