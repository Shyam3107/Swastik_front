import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import moment from "moment"
import TableCell from "@mui/material/TableCell"

import Layout from "../../Layout/Layout"
import {
  includesInArray,
  ROUTES,
  monthStart,
  currentDate,
  formatDateInDDMMYYY,
} from "../../../utils/constants"
import { header, headerKey, sampleData, EDIT_URL } from "./constants"
import {
  getExpense,
  deleteExpense,
  uploadExpense,
  downloadExpense,
} from "../../../containers/OfficeExpense/action"
import {
  access,
  isOperationAllowed,
  operations,
  checkBoxCondition,
} from "../../../utils/utilities"

const Office = (props) => {
  let { getExpense } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(currentDate)
  let { loading, expenses, downloadLoading } = props.officeExpense
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
      props.getExpense()
      setSelected([])
    }
    props.deleteExpense(selected, cb)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_OFFICE_EXPENSE)
  }

  const handleEditButton = () => {
    const expenseId = selected[0]
    history.push(EDIT_URL(expenseId))
  }

  if (!expenses || !Array.isArray(expenses)) expenses = []

  expenses = expenses.filter((val) => {
    return includesInArray([val.remarks, val?.addedBy?.location ?? ""], search)
  })

  const tableRow = [...header, "Added By"].map((headCell, index) => (
    <TableCell style={{ fontWeight: "600" }} key={index}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return [...headerKey, "addedBy"].map((headVal, index) => {
      return (
        <TableCell key={index}>
          {headVal === "date" && formatDateInDDMMYYY(row[headVal])}
          {headVal === "addedBy" ? row?.addedBy?.location ?? "" : ""}
          {headVal !== "date" && headVal !== "addedBy" && row[headVal]}
        </TableCell>
      )
    })
  }

  return (
    <Layout
      title="Office Expenses"
      mssgTitle="Expenses"
      sampleName="Office Expenses Sample"
      loading={loading}
      search={search}
      selectedFrom={from}
      selectedTo={to}
      data={expenses}
      setSearch={setSearch}
      tableRow={tableRow}
      tableBodyFunc={tableBodyFunc}
      numSelected={selected}
      setNumSelected={setSelected}
      setSelectedFrom={setFrom}
      setSelectedTo={setTo}
      sampleData={sampleData}
      downloadLoading={downloadLoading}
      checkBoxCondition={checkBoxCondition}
      handleDeleteAgree={
        isOperationAllowed(access.OFFICE_EXPENSES, operations.DELETE) &&
        handleDeleteAgree
      }
      handleFileSubmit={
        isOperationAllowed(access.OFFICE_EXPENSES, operations.CREATE) &&
        handleFileSubmit
      }
      handleAddButton={
        isOperationAllowed(access.OFFICE_EXPENSES, operations.CREATE) &&
        handleAddButton
      }
      handleEditButton={
        isOperationAllowed(access.OFFICE_EXPENSES, operations.EDIT) &&
        handleEditButton
      }
      handleDownload={handleDownload}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    officeExpense: state.officeExpense,
    user: state.user,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getExpense,
    deleteExpense,
    uploadExpense,
    downloadExpense,
  })(Office)
)
