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
  let { loading, expenses } = props.vehiclesExpense
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

  if (!expenses || !Array.isArray(expenses)) expenses = []

  expenses = expenses.filter((val) => {
    return includesInArray(
      [
        val.remarks,
        val.pumpName ? val.pumpName : "",
        val.dieselFor ? val.dieselFor : "",
        val.driverName,
        val.vehicleNo,
        val.addedBy && val.addedBy.location ? val.addedBy.location : "",
      ],
      search
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
      setFrom(monthStart)
      setTo(currentDate)
      props.getExpense()
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

  return (
    <Layout
      title="Vehicles Expenses"
      fileName="Vehicles Expenses"
      mssgTitle="Expenses"
      sampleName="Vehicles Expenses Sample"
      loading={loading}
      search={search}
      selectedFrom={from}
      selectedTo={to}
      data={expenses}
      downloadData={downloadData}
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
    user: state.user,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getExpense,
    deleteExpense,
    uploadExpense,
  })(Vehicles)
)
