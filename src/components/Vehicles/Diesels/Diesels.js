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

  useEffect(() => {
    getDiesel({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }, [getDiesel, from, to])

  const handleFileSubmit = (file) => {
    props.uploadDiesel(file, getDiesel)
  }

  const handleDownload = () => {
    props.downloadDiesel({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }

  const handleDeleteAgree = () => {
    const cb = () => {
      setFrom(monthStart)
      setTo(currentDate)
      props.getDiesel()
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

  if (!diesels || !Array.isArray(diesels)) diesels = []

  diesels = diesels.filter((val) => {
    return includesInArray(
      [
        val.vehicleNo,
        val.quantity,
        val.amount,
        val.remarks,
        val.pumpName,
        val?.addedBy?.location ?? "",
      ],
      search
    )
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
    user: state.user,
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
