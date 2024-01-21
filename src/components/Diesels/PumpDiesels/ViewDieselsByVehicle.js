import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { withRouter } from "react-router"
import TableCell from "@mui/material/TableCell"
import { Link } from "react-router-dom"

import { ROUTES, monthStart, currentDate, fromToPayload } from "../../../utils/constants"
import { getDiesel, downloadDiesel } from "../../../containers/Diesels/action"
import LayoutView from "../../Layout/LayoutView"
import {
  header,
  headerKey,
  filterData,
  VIEW_PUMP_URL,
  EDIT_URL,
} from "./constants"
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
  const { getDiesel } = props
  let { loading, downloadLoading, diesels } = props.diesels
  const tableData = filterData(diesels?.data ?? [], search)
  const mssgTitle = "Diesels"

  let selected = []

  let fields = ["Total Amount", "Total Quantity"].map((head, index) => {
    return {
      label: head,
      id: head,
      value:
        index === 0
          ? diesels?.totalAmount ?? "0"
          : diesels?.totalQuantity ?? "0",
    }
  })

  const handleGo = () => {
    getDiesel({
      url: API.GET_DIESELS_BY_VEHICLE,
      vehicleNo,
      ...fromToPayload(from, to)
    })
  }

  useEffect(() => {
    handleGo()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const handleBack = () => {
    history.push(ROUTES.DIESELS)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_DIESEL)
  }

  const handleDownload = () => {
    props.downloadBills({
      url: API.DOWNLOAD_DIESELS_BY_VEHICLE,
      vehicleNo,
      ...fromToPayload(from, to)
    })
  }

  const tableRow = header.map((headCell) => (
    <TableCell style={{ fontWeight: "600" }} key={headCell}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return headerKey.map((headVal) => {
      return (
        <TableCell key={headVal}>
          {headVal === "pumpName" ? (
            <Link to={VIEW_PUMP_URL(row[headVal])}>{row[headVal]}</Link>
          ) : headVal === "date" ? (
            <Link to={EDIT_URL(row._id)}>{row[headVal]}</Link>
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
      data={diesels}
      viewFields={fields}
      search={search}
      setSearch={setSearch}
      selectedFrom={from}
      setSelectedFrom={setFrom}
      selectedTo={to}
      setSelectedTo={setTo}
      handleBack={handleBack}
      handleGo={handleGo}
      handleAddButton={
        isOperationAllowed(access.DIESELS, operations.CREATE) && handleAddButton
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
    diesels: state.diesels,
  }
}

export default withRouter(
  connect(mapStateToProps, { getDiesel, downloadDiesel })(Comp)
)
