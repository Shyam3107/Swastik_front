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
} from "../../../containers/Trips/action"
import Layout from "../../Layout/Layout"
import {
  includesInArray,
  ROUTES,
  currentDate,
  formatDateInDDMMYYY,
} from "../../../utils/constants"
import { header, headerKey, sampleData, EDIT_URL, VIEW_URL } from "./constants"

const Trips = (props) => {
  let { getTrips } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  const [from, setFrom] = useState(currentDate)
  const [to, setTo] = useState(currentDate)
  let {
    loading,
    trips,
    addLoading,
    editLoading,
    deleteLoading,
    uploadLoading,
  } = props.trips
  const history = props.history
  const user = props.user.user

  useEffect(() => {
    getTrips({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }, [getTrips, from, to])

  const handleFileSubmit = (file) => {
    props.uploadTrips(file, getTrips)
  }

  if (!trips || !Array.isArray(trips)) trips = []

  trips = trips.filter((val) => {
    return includesInArray(
      [
        val.diNo,
        val.lrNo,
        val.partyName,
        val.location,
        val.vehicleNo,
        val.driverName,
        val.pumpName ? val.pumpName : "",
        val.loadingPoint,
        val.addedBy && val.addedBy.location ? val.addedBy.location : "",
      ],
      search
    )
  })

  let downloadData = trips.map((item) => {
    return [...headerKey, "addedBy"].map((val) => {
      if (val === "date") return formatDateInDDMMYYY(item[val])
      if (val === "addedBy") return item[val] ? item[val].location : ""
      return item[val]
    })
  })

  downloadData = [[...header, "Added By"], ...downloadData]

  const tableRow = [...header, "Added By"].map((headCell, index) => (
    <TableCell style={{ fontWeight: "600" }} key={index}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return [...headerKey, "addedBy"].map((headVal, index) => {
      if (headVal === "diNo")
        return (
          <TableCell key={index}>
            <Link to={VIEW_URL(row[headVal])}>{row[headVal]}</Link>
          </TableCell>
        )
      return (
        <TableCell key={index}>
          {headVal === "date" && formatDateInDDMMYYY(row[headVal])}
          {headVal === "addedBy"
            ? row.addedBy
              ? row.addedBy.location
              : ""
            : ""}
          {headVal !== "date" && headVal !== "addedBy" && row[headVal]}
        </TableCell>
      )
    })
  }

  const handleDeleteAgree = () => {
    const cb = () => {
      props.getTrips()
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

  const checkBoxCondition = (row) => {
    return row.addedBy._id === user._id || user._id === user.companyAdminId._id
  }

  return (
    <Layout
      addLoading={addLoading || uploadLoading}
      editLoading={editLoading}
      deleteLoading={deleteLoading}
      title="Trips"
      handleDeleteAgree={handleDeleteAgree}
      handleFileSubmit={handleFileSubmit}
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
      fileName="trips"
      sampleName="tripSample"
      handleAddButton={handleAddButton}
      handleEditButton={handleEditButton}
      setSelectedFrom={setFrom}
      setSelectedTo={setTo}
      selectedFrom={from}
      selectedTo={to}
      sampleData={sampleData}
      downloadData={downloadData}
      downloadLoading={addLoading}
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
  })(Trips)
)
