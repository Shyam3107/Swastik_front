import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import moment from "moment"
import TableCell from "@mui/material/TableCell"

import Layout from "../../Layout/Layout"
import { ROUTES, monthStart, currentDate } from "../../../utils/constants"
import {
  header,
  headerKey,
  sampleData,
  EDIT_URL,
  filterData,
} from "./constants"
import {
  getExpense,
  deleteExpense,
  uploadExpense,
  downloadExpense,
} from "../../../containers/VehicleExpense/action"
import {
  access,
  isOperationAllowed,
  operations,
  checkBoxCondition,
} from "../../../utils/utilities"

const Vehicles = (props) => {
  let { getExpense } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(currentDate)
  let { loading, expenses, downloadLoading } = props.vehiclesExpense
  const history = props.history

  useEffect(() => {
    getExpense({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }, [getExpense, from, to])

  const handleFileSubmit = (file) => {
    props.uploadExpense(file, getExpense)
  }

  const handleDownload = () => {
    props.downloadExpense({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }

  const handleDeleteAgree = () => {
    const cb = () => {
      setFrom(monthStart)
      setTo(currentDate)
      props.getExpense({
        from: moment(from).toISOString(),
        to: moment(to).toISOString(),
      })
      setSelected([])
    }
    props.deleteExpense(selected, cb)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_VEHICLES_EXPENSE)
  }

  const handleEditButton = () => {
    const expenseId = selected[0]
    history.push(EDIT_URL(expenseId))
  }

  expenses = filterData(expenses, search)

  const tableRow = [...header, "Added By"].map((headCell, index) => (
    <TableCell style={{ fontWeight: "600" }} key={index}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return [...headerKey, "addedBy"].map((headVal, index) => {
      return <TableCell key={index}>{row[headVal]}</TableCell>
    })
  }

  return (
    <Layout
      title="Vehicles Expenses"
      mssgTitle="Expenses"
      sampleName="Vehicles Expenses Sample"
      loading={loading}
      search={search}
      selectedFrom={from}
      selectedTo={to}
      data={expenses}
      handleDownload={handleDownload}
      downloadLoading={downloadLoading}
      handleDeleteAgree={
        isOperationAllowed(access.VEHICLE_EXPENSES, operations.DELETE) &&
        handleDeleteAgree
      }
      handleFileSubmit={
        isOperationAllowed(access.VEHICLE_EXPENSES, operations.CREATE) &&
        handleFileSubmit
      }
      checkBoxCondition={checkBoxCondition}
      setSearch={setSearch}
      tableRow={tableRow}
      tableBodyFunc={tableBodyFunc}
      numSelected={selected}
      setNumSelected={setSelected}
      handleAddButton={
        isOperationAllowed(access.VEHICLE_EXPENSES, operations.CREATE) &&
        handleAddButton
      }
      handleEditButton={
        isOperationAllowed(access.VEHICLE_EXPENSES, operations.EDIT) &&
        handleEditButton
      }
      setSelectedFrom={setFrom}
      setSelectedTo={setTo}
      sampleData={sampleData}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    vehiclesExpense: state.vehiclesExpense,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getExpense,
    deleteExpense,
    uploadExpense,
    downloadExpense,
  })(Vehicles)
)
