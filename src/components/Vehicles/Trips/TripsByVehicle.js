import React, { useEffect, useState } from "react"
import moment from "moment"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { withRouter } from "react-router"
import TableCell from "@mui/material/TableCell"
import { Link } from "react-router-dom"

import { ROUTES, monthStart, currentDate } from "../../../utils/constants"
import { getTrips, downloadTrips } from "../../../containers/Trips/action"
import LayoutView from "../../Layout/LayoutView"
import { header, headerKey, filterData, EDIT_URL } from "./constants"
import {
  access,
  isOperationAllowed,
  operations,
  checkBoxCondition,
} from "../../../utils/utilities"
import CustomTableOutput from "../../CustomComponents/CustomTableOutput/CustomTableOutput"

import { API } from "../../../APIs/APIs"

const Comp = (props) => {
  const history = props.history
  const [search, setSearch] = useState("")
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(currentDate)
  const params = useParams()
  const { vehicleNo } = params
  const { getTrips } = props
  let { loading, downloadLoading, trips } = props.trips
  const tableData = filterData(trips?.data ?? [], search)
  const mssgTitle = "Trips"

  let selected = []

  let fields = ["Total Quantity"].map((head, index) => {
    return {
      label: head,
      id: head,
      value: trips?.totalQuantity ?? "0",
    }
  })

  useEffect(() => {
    getTrips({
      url: API.GET_TRIPS_BY_VEHICLE,
      vehicleNo,
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }, [getTrips, from, to, vehicleNo])

  const handleBack = () => {
    history.push(ROUTES.TRIPS)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_TRIP)
  }

  const handleDownload = () => {
    props.downloadTrips({
      url: API.DOWNLOAD_TRIPS_BY_VEHICLE,
      vehicleNo,
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }

  const tableRow = header.map((headCell, index) => (
    <TableCell style={{ fontWeight: "600" }} key={index}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return headerKey.map((headVal, index) => {
      return (
        <TableCell key={index}>
          {headVal === "diNo" ? (
            <Link to={EDIT_URL(row[headVal])}>{row[headVal]}</Link>
          ) : (
            row[headVal]
          )}
        </TableCell>
      )
    })
  }

  return (
    <LayoutView
      title={vehicleNo}
      loading={loading}
      data={trips}
      viewFields={fields}
      search={search}
      setSearch={setSearch}
      selectedFrom={from}
      setSelectedFrom={setFrom}
      selectedTo={to}
      setSelectedTo={setTo}
      handleBack={handleBack}
      handleAddButton={
        isOperationAllowed(access.TRIPS, operations.CREATE) && handleAddButton
      }
      numSelected={selected}
      downloadLoading={downloadLoading}
      handleDownload={handleDownload}
    >
      <CustomTableOutput
        data={tableData}
        mssgTitle={mssgTitle}
        loading={loading}
        tableRow={tableRow}
        tableBodyFunc={tableBodyFunc}
        //numSelected={numSelected}
        //setNumSelected={setNumSelected}
        checkBoxCondition={checkBoxCondition}
        selectedFrom={setFrom}
        selectedTo={setTo}
      />
    </LayoutView>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    trips: state.trips,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getTrips,
    downloadTrips,
  })(Comp)
)
