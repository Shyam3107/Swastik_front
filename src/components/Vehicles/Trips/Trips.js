import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import TableCell from "@mui/material/TableCell"

import {
  getTrips,
  deleteTrips,
  uploadTrips,
  uploadRates,
  downloadTrips,
} from "../../../containers/Trips/action"
import Layout from "../../Layout/Layout"
import { ROUTES, currentDate, fromToPayload } from "../../../utils/constants"
import {
  header,
  headerKey,
  sampleData,
  sampleData2,
  EDIT_URL,
  VIEW_URL,
  VIEW_VEHICLE_URL,
  filterData,
} from "./constants"
import {
  isOperationAllowed,
  access,
  operations,
  checkBoxCondition,
  isAdmin,
} from "../../../utils/utilities"

const Trips = (props) => {
  let { getTrips } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  const [from, setFrom] = useState(currentDate)
  const [to, setTo] = useState(currentDate)
  let { loading, trips, downloadLoading } = props.trips
  const history = props.history


  const handleGo = () => {
    getTrips(fromToPayload(from, to))
  }

  useEffect(() => {
    handleGo()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const handleFileSubmit = (file) => {
    props.uploadTrips(file, handleGo)
  }

  const handleFile2Submit = (file) => {
    props.uploadRates(file, handleGo)
  }

  const handleDownload = () => {
    props.downloadTrips(fromToPayload(from, to))
  }

  const handleDeleteAgree = () => {
    const cb = () => {
      handleGo()
      setSelected([])
    }
    props.deleteTrips(selected, cb)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_TRIP)
  }

  const handleEditButton = () => {
    const tripId = selected[0]
    const searchId = trips.filter((val) => val._id === tripId)
    history.push(EDIT_URL(searchId[0].diNo))
  }

  trips = filterData(trips, search)

  const tableRow = [...header, "Added By"].map((headCell) => (
    <TableCell style={{ fontWeight: "600" }} key={headCell}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return [...headerKey, "addedBy"].map((headVal) => {
      return (
        <TableCell key={headVal}>
          {headVal === "diNo" ? (
            <Link to={VIEW_URL(row[headVal])}>{row[headVal]}</Link>
          ) : headVal === "vehicleNo" ? (
            <Link to={VIEW_VEHICLE_URL(row[headVal])}>{row[headVal]}</Link>
          ) : (
            row[headVal]
          )}
        </TableCell>
      )
    })
  }

  return (
    <Layout
      title="Trips"
      handleDeleteAgree={
        isOperationAllowed(access.TRIPS, operations.DELETE) && handleDeleteAgree
      }
      handleFileSubmit={
        isOperationAllowed(access.TRIPS, operations.CREATE) && handleFileSubmit
      }
      handleFile2Submit={
        isAdmin() && handleFile2Submit
      }
      handleGo={handleGo}
      search={search}
      setSearch={setSearch}
      data={trips}
      mssgTitle="Trips"
      mssg="No Trips found on Selected Date Interval"
      loading={loading}
      tableRow={tableRow}
      tableBodyFunc={tableBodyFunc}
      numSelected={selected}
      setNumSelected={setSelected}
      checkBoxCondition={checkBoxCondition}
      sampleName="Trip Sample"
      sampleName2="Rate Sample"
      upload2ToolTip="Upload Rates"
      handleAddButton={
        isOperationAllowed(access.TRIPS, operations.CREATE) && handleAddButton
      }
      handleEditButton={
        isOperationAllowed(access.TRIPS, operations.EDIT) && handleEditButton
      }
      setSelectedFrom={setFrom}
      setSelectedTo={setTo}
      selectedFrom={from}
      selectedTo={to}
      sampleData={sampleData}
      sampleData2={sampleData2}
      downloadLoading={downloadLoading}
      handleDownload={handleDownload}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getTrips,
    deleteTrips,
    uploadTrips,
    uploadRates,
    downloadTrips,
  })(Trips)
)
