import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import TableCell from "@mui/material/TableCell"
import { Link } from "react-router-dom"

import Layout from "../../Layout/Layout"
import { ROUTES, monthStart, currentDate, fromToPayload } from "../../../utils/constants"
import {
  header,
  headerKey,
  sampleData,
  EDIT_URL,
  filterData,
  VIEW_PUMP_URL,
  VIEW_VEHICLE_URL,
} from "./constants"
import {
  getDiesel,
  deleteDiesel,
  uploadDiesel,
  downloadDiesel,
} from "../../../containers/Diesels/action"
import {
  access,
  isOperationAllowed,
  operations,
  checkBoxCondition,
} from "../../../utils/utilities"

const Office = (props) => {
  let { getDiesel } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(currentDate)
  let { loading, diesels, downloadLoading } = props.diesels
  const history = props.history

  const handleGo = () => {
    getDiesel(fromToPayload(from, to))
  }

  useEffect(() => {
    handleGo()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const handleFileSubmit = (file) => {
    props.uploadDiesel(file, handleGo)
  }

  const handleDownload = () => {
    props.downloadDiesel(fromToPayload(from, to))
  }

  const handleDeleteAgree = () => {
    const cb = () => {
      handleGo()
      setSelected([])
    }
    props.deleteDiesel(selected, cb)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_DIESEL)
  }

  const handleEditButton = () => {
    const dieselId = selected[0]
    history.push(EDIT_URL(dieselId))
  }

  diesels = filterData(diesels, search)

  const tableRow = [...header, "Added By"].map((headCell) => (
    <TableCell style={{ fontWeight: "600" }} key={headCell}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return [...headerKey, "addedBy"].map((headVal) => {
      return (
        <TableCell key={headVal}>
          {headVal === "pumpName" ? (
            <Link to={VIEW_PUMP_URL(row[headVal])}>{row[headVal]}</Link>
          ) : headVal === "date" ? (
            <Link to={EDIT_URL(row._id)}>{row[headVal]}</Link>
          ) : headVal === "vehicleNo" ? (
            <Link to={VIEW_VEHICLE_URL(row.vehicleNo)}>{row[headVal]}</Link>
          ) : (
            row[headVal]
          )}
        </TableCell>
      )
    })
  }

  return (
    <Layout
      title="Diesels"
      mssgTitle="Diesels"
      sampleName="Diesels Sample"
      loading={loading}
      search={search}
      selectedFrom={from}
      selectedTo={to}
      data={diesels}
      handleGo={handleGo}
      handleDeleteAgree={
        isOperationAllowed(access.DIESELS, operations.DELETE) &&
        handleDeleteAgree
      }
      handleFileSubmit={
        isOperationAllowed(access.DIESELS, operations.CREATE) &&
        handleFileSubmit
      }
      checkBoxCondition={checkBoxCondition}
      setSearch={setSearch}
      tableRow={tableRow}
      tableBodyFunc={tableBodyFunc}
      numSelected={selected}
      setNumSelected={setSelected}
      handleAddButton={
        isOperationAllowed(access.DIESELS, operations.CREATE) && handleAddButton
      }
      handleEditButton={
        isOperationAllowed(access.DIESELS, operations.EDIT) && handleEditButton
      }
      setSelectedFrom={setFrom}
      setSelectedTo={setTo}
      sampleData={sampleData}
      handleDownload={handleDownload}
      downloadLoading={downloadLoading}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    diesels: state.diesels,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getDiesel,
    deleteDiesel,
    uploadDiesel,
    downloadDiesel,
  })(Office)
)
