import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import moment from "moment"
import { Link } from "react-router-dom"
import TableCell from "@mui/material/TableCell"

import Layout from "../../Layout/Layout"
import { ROUTES, monthStart, currentDate } from "../../../utils/constants"
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

  useEffect(() => {
    getLogistics({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }, [getLogistics, from, to])

  const handleDeleteAgree = () => {
    const cb = () => {
      setFrom(monthStart)
      setTo(currentDate)
      getLogistics({
        from: moment(from).toISOString(),
        to: moment(to).toISOString(),
      })
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
    props.downloadLogistics({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }

  const handleFileSubmit = (file) => {
    const cb = () => {
      getLogistics({
        from: moment(from).toISOString(),
        to: moment(to).toISOString(),
      })
    }
    props.uploadLogistics(file, cb)
  }

  logistics = filterData(logistics, search)

  const tableRow = header.map((headCell, index) => (
    <TableCell style={{ fontWeight: "600" }} key={index}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return headerKey.map((headVal, index) => {
      return (
        <TableCell key={index}>
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
      handleFileSubmit={handleFileSubmit}
      handleDownload={handleDownload}
      handleAddButton={
        isOperationAllowed(access.PRODUCTS, operations.ADD) && handleAddButton
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
    user: state.user,
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
