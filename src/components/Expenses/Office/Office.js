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
} from "../../../containers/OfficeExpense/action"

const Office = (props) => {
  let { getExpense } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(currentDate)
  let {
    loading,
    expenses,
    addLoading,
    editLoading,
    deleteLoading,
    uploadLoading,
  } = props.officeExpense
  const history = props.history
  const user = props.user.user

  useEffect(() => {
    getExpense()
  }, [getExpense])

  const handleFileSubmit = (file) => {
    props.uploadExpense(file, getExpense)
  }

  if (!expenses || !Array.isArray(expenses)) expenses = []

  expenses = expenses.filter((val) => {
    return (
      moment(from).isSameOrBefore(val.date) &&
      moment(to).isSameOrAfter(val.date) &&
      includesInArray(
        [
          val.remarks,
          val.addedBy && val.addedBy.location ? val.addedBy.location : "",
        ],
        search
      )
    )
  })

  let downloadData = expenses.map((item) => {
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

  const checkBoxCondition = (row) => {
    return row.addedBy._id === user._id || user._id === user.companyAdminId._id
  }

  return (
    <Layout
      title="Office Expenses"
      fileName="Office Expenses"
      mssgTitle="Expenses"
      sampleName="Office Expenses Sample"
      loading={loading}
      addLoading={addLoading || uploadLoading}
      downloadLoading={addLoading}
      search={search}
      selectedFrom={from}
      selectedTo={to}
      data={expenses}
      downloadData={downloadData}
      editLoading={editLoading}
      deleteLoading={deleteLoading}
      handleDeleteAgree={handleDeleteAgree}
      handleFileSubmit={handleFileSubmit}
      checkBoxCondition={checkBoxCondition}
      setSearch={setSearch}
      tableRow={tableRow}
      tableBodyFunc={tableBodyFunc}
      numSelected={selected}
      setNumSelected={setSelected}
      handleAddButton={handleAddButton}
      handleEditButton={handleEditButton}
      setSelectedFrom={setFrom}
      setSelectedTo={setTo}
      sampleData={sampleData}
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
  })(Office)
)
