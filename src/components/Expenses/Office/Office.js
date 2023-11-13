import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import TableCell from "@mui/material/TableCell"

import Layout from "../../Layout/Layout"
import { ROUTES, monthStart, currentDate, fromToPayload } from "../../../utils/constants"
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

  const handleGo = () => {
    getExpense(fromToPayload(from,to))
  }

  useEffect(() => {
    handleGo()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps


  const handleFileSubmit = (file) => {
    props.uploadExpense(file, handleGo)
  }

  const handleDownload = () => {
    props.downloadExpense(fromToPayload(from,to))
  }

  const handleDeleteAgree = () => {
    const cb = () => {
      handleGo()
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

  expenses = filterData(expenses, search)

  const tableRow = [...header, "Added By"].map((headCell) => (
    <TableCell style={{ fontWeight: "600" }} key={headCell}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return [...headerKey, "addedBy"].map((headVal) => {
      return <TableCell key={headVal}>{row[headVal]}</TableCell>
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
      handleGo={handleGo}
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
