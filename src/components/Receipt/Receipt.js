import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import moment from "moment"
import TableCell from "@mui/material/TableCell"

import Layout from "../Layout/Layout"
import {
  includesInArray,
  ROUTES,
  monthStart,
  currentDate,
  formatDateInDDMMYYY,
} from "../../utils/constants"
import { header, headerKey, sampleData, EDIT_URL } from "./constants"
import { getReceipt, deleteReceipt } from "../../containers/Receipt/action"
import { access, isOperationAllowed, operations } from "../../utils/utilities"

const Office = (props) => {
  let { getReceipt } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(currentDate)
  let { loading, receipts } = props.receipt
  const history = props.history

  useEffect(() => {
    getReceipt({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }, [getReceipt, from, to])

  if (!receipts || !Array.isArray(receipts)) receipts = []

  receipts = receipts.filter((val) => {
    return includesInArray(
      [
        val.remarks,
        val.addedBy && val.addedBy.location ? val.addedBy.location : "",
      ],
      search
    )
  })

  let downloadData = receipts.map((item) => {
    return [...headerKey, "addedBy"].map((val) => {
      if (val === "date") return formatDateInDDMMYYY(item[val])
      if (val === "addedBy") return item.addedBy ? item.addedBy.location : ""
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
      setFrom(monthStart)
      setTo(currentDate)
      props.getReceipt()
      setSelected([])
    }
    props.deleteReceipt(selected, cb)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_RECEIPT)
  }

  const handleEditButton = () => {
    const expenseId = selected[0]
    history.push(EDIT_URL(expenseId))
  }

  return (
    <Layout
      title="Receipts"
      fileName="Receipts"
      mssgTitle="Receipts"
      sampleName="Receipts Sample"
      loading={loading}
      search={search}
      selectedFrom={from}
      selectedTo={to}
      data={receipts}
      downloadData={downloadData}
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
        isOperationAllowed(access.RECEIPTS, operations.ADD) && handleAddButton
      }
      handleEditButton={
        isOperationAllowed(access.RECEIPTS, operations.EDIT) && handleEditButton
      }
      setSelectedFrom={setFrom}
      setSelectedTo={setTo}
      sampleData={sampleData}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    receipt: state.receipt,
    user: state.user,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getReceipt,
    deleteReceipt,
  })(Office)
)
