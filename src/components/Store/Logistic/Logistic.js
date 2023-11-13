import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import TableCell from "@mui/material/TableCell"

import Layout from "../../Layout/Layout"
import { ROUTES, monthStart, currentDate, fromToPayload } from "../../../utils/constants"
import {
  header,
  headerKey,
  sampleData,
  EDIT_URL,
  VIEW_PRODUCT_URL,
  filterData,
} from "./constants"
import {
  getLogistics,
  deleteLogistics,
  downloadLogistics,
  uploadLogistics,
} from "../../../containers/Logistics/action"
import {
  access,
  isOperationAllowed,
  operations,
} from "../../../utils/utilities"

const Logistic = (props) => {
  let { getLogistics } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(currentDate)
  let { loading, logistics, downloadLoading } = props.logistics
  const history = props.history

  const handleGo = () => {
    getLogistics(fromToPayload(from, to))
  }

  useEffect(() => {
    handleGo()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteAgree = () => {
    const cb = () => {
      handleGo()
      setSelected([])
    }
    props.deleteLogistics(selected, cb)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_LOGISTIC)
  }

  const handleEditButton = () => {
    const id = selected[0]
    history.push(EDIT_URL(id))
  }

  const handleDownload = () => {
    props.downloadLogistics(fromToPayload(from, to))
  }

  const handleFileSubmit = (file) => {
    props.uploadLogistics(file, handleGo)
  }

  logistics = filterData(logistics, search)

  const tableRow = header.map((headCell) => (
    <TableCell style={{ fontWeight: "600" }} key={headCell}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return headerKey.map((headVal) => {
      return (
        <TableCell key={headVal}>
          {headVal === "product" ? (
            <Link to={VIEW_PRODUCT_URL(row.productId)}>{row[headVal]}</Link>
          ) : (
            row[headVal]
          )}
        </TableCell>
      )
    })
  }

  return (
    <Layout
      title="Logistics"
      mssgTitle="Logistics"
      sampleName="Logistics Sample"
      data={logistics}
      sampleData={sampleData}
      loading={loading}
      search={search}
      setSearch={setSearch}
      selectedFrom={from}
      setSelectedFrom={setFrom}
      selectedTo={to}
      setSelectedTo={setTo}
      numSelected={selected}
      setNumSelected={setSelected}
      tableRow={tableRow}
      tableBodyFunc={tableBodyFunc}
      downloadLoading={downloadLoading}
      handleGo={handleGo}
      handleFileSubmit={
        isOperationAllowed(access.PRODUCTS, operations.CREATE) &&
        handleFileSubmit
      }
      handleDownload={handleDownload}
      handleAddButton={
        isOperationAllowed(access.PRODUCTS, operations.CREATE) &&
        handleAddButton
      }
      handleEditButton={
        isOperationAllowed(access.PRODUCTS, operations.EDIT) && handleEditButton
      }
      handleDeleteAgree={
        isOperationAllowed(access.PRODUCTS, operations.DELETE) &&
        handleDeleteAgree
      }
    />
  )
}

const mapStateToProps = (state) => {
  return {
    logistics: state.logistics,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getLogistics,
    deleteLogistics,
    downloadLogistics,
    uploadLogistics,
  })(Logistic)
)
