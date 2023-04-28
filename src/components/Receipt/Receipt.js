import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import moment from "moment"
import TableCell from "@mui/material/TableCell"

import Layout from "../Layout/Layout"
import { ROUTES, monthStart, currentDate } from "../../utils/constants"
import {
  header,
  headerKey,
  sampleData,
  EDIT_URL,
  filterData,
} from "./constants"
import {
  getReceipt,
  uploadReceipt,
  deleteReceipt,
  downloadReceipt,
} from "../../containers/Receipt/action"
import { access, isOperationAllowed, operations } from "../../utils/utilities"

const Office = (props) => {
  let { getReceipt } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(currentDate)
  let { loading, receipts, downloadLoading } = props.receipt
  const history = props.history

  useEffect(() => {
    getReceipt({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }, [getReceipt, from, to])

  const handleDeleteAgree = () => {
    const cb = () => {
      setFrom(monthStart)
      setTo(currentDate)
      props.getReceipt({
        from: moment(from).toISOString(),
        to: moment(to).toISOString(),
      })
      setSelected([])
    }
    props.deleteReceipt(selected, cb)
  }

  const handleFileSubmit = (file) => {
    props.uploadReceipt(file, getReceipt)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_RECEIPT)
  }

  const handleEditButton = () => {
    const expenseId = selected[0]
    history.push(EDIT_URL(expenseId))
  }

  const handleDownload = () => {
    props.downloadReceipt({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }

  receipts = filterData(receipts, search)

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
      title="Receipts"
      mssgTitle="Receipts"
      sampleName="Receipts Sample"
      loading={loading}
      search={search}
      selectedFrom={from}
      selectedTo={to}
      data={receipts}
      handleFileSubmit={
        isOperationAllowed(access.RECEIPTS, operations.CREATE) &&
        handleFileSubmit
      }
      handleDeleteAgree={
        isOperationAllowed(access.RECEIPTS, operations.DELETE) &&
        handleDeleteAgree
      }
      setSearch={setSearch}
      tableRow={tableRow}
      tableBodyFunc={tableBodyFunc}
      numSelected={selected}
      setNumSelected={setSelected}
      handleAddButton={
        isOperationAllowed(access.RECEIPTS, operations.CREATE) &&
        handleAddButton
      }
      handleEditButton={
        isOperationAllowed(access.RECEIPTS, operations.EDIT) && handleEditButton
      }
      setSelectedFrom={setFrom}
      setSelectedTo={setTo}
      sampleData={sampleData}
      downloadLoading={downloadLoading}
      handleDownload={handleDownload}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    receipt: state.receipt,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getReceipt,
    deleteReceipt,
    uploadReceipt,
    downloadReceipt,
  })(Office)
)
