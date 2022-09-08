import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import moment from "moment"
import TableCell from "@mui/material/TableCell"
import { Link } from "react-router-dom"

import Layout from "../../Layout/Layout"
import { ROUTES, monthStart, currentDate } from "../../../utils/constants"
import {
  header,
  headerKey,
  sampleData,
  EDIT_URL,
  filterData,
  VIEW_SHOP_URL,
  VIEW_VEHICLE_URL,
} from "./constants"
import {
  getBills,
  deleteBills,
  downloadBills,
  uploadBills,
} from "../../../containers/HardwareShopBills/action"
import {
  access,
  isOperationAllowed,
  operations,
} from "../../../utils/utilities"

const Bills = (props) => {
  let { getBills } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(currentDate)
  let { loading, bills, downloadLoading } = props.bills
  const history = props.history

  useEffect(() => {
    getBills({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }, [getBills, from, to])

  const handleDeleteAgree = () => {
    const cb = () => {
      setFrom(monthStart)
      setTo(currentDate)
      getBills({
        from: moment(from).toISOString(),
        to: moment(to).toISOString(),
      })
      setSelected([])
    }
    props.deleteBills(selected, cb)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_HARDWARE_SHOP_BILL)
  }

  const handleEditButton = () => {
    const id = selected[0]
    history.push(EDIT_URL(id))
  }

  const handleDownload = () => {
    props.downloadBills({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }

  const handleFileSubmit = (file) => {
    const cb = () => {
      getBills({
        from: moment(from).toISOString(),
        to: moment(to).toISOString(),
      })
    }
    props.uploadBills(file, cb)
  }

  bills = filterData(bills, search)

  const tableRow = header.map((headCell, index) => (
    <TableCell style={{ fontWeight: "600" }} key={index}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return [...headerKey, "addedBy"].map((headVal, index) => {
      return (
        <TableCell key={index}>
          {headVal === "shopName" ? (
            <Link to={VIEW_SHOP_URL(row.shopName)}>{row[headVal]}</Link>
          ) : headVal === "date" ? (
            <Link to={EDIT_URL(row._id)}>{row[headVal]}</Link>
          ) : headVal === "vehicleNo" ? (
            <Link to={VIEW_VEHICLE_URL(row.vehicleNo)}>{row[headVal]}</Link>
          ) : (
            row[headVal]
          )}
        </TableCell>
      )
    })
  }

  return (
    <Layout
      title="Bills"
      mssgTitle="Bills"
      sampleName="Bills Sample"
      data={bills}
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
      handleFileSubmit={
        isOperationAllowed(access.STORE_BILLS, operations.CREATE) &&
        handleFileSubmit
      }
      handleDownload={handleDownload}
      handleAddButton={
        isOperationAllowed(access.STORE_BILLS, operations.CREATE) &&
        handleAddButton
      }
      handleEditButton={
        isOperationAllowed(access.STORE_BILLS, operations.EDIT) &&
        handleEditButton
      }
      handleDeleteAgree={
        isOperationAllowed(access.STORE_BILLS, operations.DELETE) &&
        handleDeleteAgree
      }
    />
  )
}

const mapStateToProps = (state) => {
  return {
    bills: state.hardwareShopBills,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getBills,
    deleteBills,
    downloadBills,
    uploadBills,
  })(Bills)
)
