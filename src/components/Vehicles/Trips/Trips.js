import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import moment from "moment"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import TableCell from "@mui/material/TableCell"

import {
  getTrips,
  deleteTrips,
  uploadTrips,
  downloadTrips,
} from "../../../containers/Trips/action"
import Layout from "../../Layout/Layout"
import { includesInArray, ROUTES, currentDate } from "../../../utils/constants"
import {
  header,
  headerKey,
  sampleData,
  EDIT_URL,
  VIEW_URL,
  filterData,
} from "./constants"
import {
  isOperationAllowed,
  access,
  operations,
  checkBoxCondition,
} from "../../../utils/utilities"

const Trips = (props) => {
  let { getTrips } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  const [from, setFrom] = useState(currentDate)
  const [to, setTo] = useState(currentDate)
  let { loading, trips, downloadLoading } = props.trips
  const history = props.history

  useEffect(() => {
    getTrips({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }, [getTrips, from, to])

  const handleFileSubmit = (file) => {
    props.uploadTrips(file, getTrips)
  }

  const handleDownload = () => {
    props.downloadTrips({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }

  const handleDeleteAgree = () => {
    const cb = () => {
      setFrom(currentDate)
      setTo(currentDate)
      getTrips({
        from: moment(from).toISOString(),
        to: moment(to).toISOString(),
      })
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

  const tableRow = [...header, "Added By"].map((headCell, index) => (
    <TableCell style={{ fontWeight: "600" }} key={index}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return [...headerKey, "addedBy"].map((headVal, index) => {
      return (
        <TableCell key={index}>
          {headVal === "diNo" ? (
            <Link to={VIEW_URL(row[headVal])}>{row[headVal]}</Link>
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
      sampleName="tripSample"
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
      downloadLoading={downloadLoading}
      handleDownload={handleDownload}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
    user: state.user,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getTrips,
    deleteTrips,
    uploadTrips,
    downloadTrips,
  })(Trips)
)
