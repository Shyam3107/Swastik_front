import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import TableCell from "@mui/material/TableCell"

import Layout from "../../Layout/Layout"
import { ROUTES } from "../../../utils/constants"
import {
  header,
  headerKey,
  sampleData,
  EDIT_URL,
  filterData,
} from "./constants"
import {
  getVehicleOwner,
  deleteVehicleOwner,
  downloadVehicleOwner,
  uploadVehicleOwner,
} from "../../../containers/VehicleOwner/action"
import {
  access,
  isOperationAllowed,
  operations,
} from "../../../utils/utilities"

const Logistic = (props) => {
  let { getVehicleOwner } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  let { loading, vehicleOwner, downloadLoading } = props.vehicleOwner
  const history = props.history

  useEffect(() => {
    getVehicleOwner()
  }, [getVehicleOwner])

  const handleDeleteAgree = () => {
    const cb = () => {
      getVehicleOwner()
      setSelected([])
    }
    props.deleteVehicleOwner(selected, cb)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_VEHICLE_OWNER)
  }

  const handleEditButton = () => {
    const id = selected[0]
    const searchId = vehicleOwner?.filter((val) => val._id === id)
    history.push(EDIT_URL(searchId.vehicleNo))
  }

  const handleDownload = () => {
    props.downloadVehicleOwner()
  }

  const handleFileSubmit = (file) => {
    const cb = () => {
      getVehicleOwner()
    }
    props.uploadVehicleOwner(file, cb)
  }

  vehicleOwner = filterData(vehicleOwner, search)

  const tableRow = header.map((headCell, index) => (
    <TableCell style={{ fontWeight: "600" }} key={index}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return headerKey.map((headVal, index) => {
      return (
        <TableCell key={index}>
          {headVal === "vehicleNo" ? (
            <Link to={EDIT_URL(row[headVal])}>{row[headVal]}</Link>
          ) : (
            row[headVal]
          )}
        </TableCell>
      )
    })
  }

  return (
    <Layout
      title="Vehicle Owner"
      mssgTitle="Vehicle Owner"
      sampleName="Vehicle Owner Sample"
      data={vehicleOwner}
      sampleData={sampleData}
      loading={loading}
      search={search}
      setSearch={setSearch}
      numSelected={selected}
      setNumSelected={setSelected}
      tableRow={tableRow}
      tableBodyFunc={tableBodyFunc}
      downloadLoading={downloadLoading}
      handleFileSubmit={handleFileSubmit}
      handleDownload={handleDownload}
      handleAddButton={
        isOperationAllowed(access.VEHICLE_OWNER, operations.ADD) &&
        handleAddButton
      }
      handleEditButton={
        isOperationAllowed(access.VEHICLE_OWNER, operations.EDIT) &&
        handleEditButton
      }
      handleDeleteAgree={
        isOperationAllowed(access.VEHICLE_OWNER, operations.DELETE) &&
        handleDeleteAgree
      }
    />
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    vehicleOwner: state.vehicleOwner,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getVehicleOwner,
    deleteVehicleOwner,
    downloadVehicleOwner,
    uploadVehicleOwner,
  })(Logistic)
)
