import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import moment from "moment"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import TableCell from "@mui/material/TableCell"

import {
  getVouchers,
  deleteVouchers,
  uploadVouchers,
  downloadVouchers,
} from "../../../containers/Vouchers/action"
import Layout from "../../Layout/Layout"
import { ROUTES, currentDate, monthStart } from "../../../utils/constants"
import {
  header,
  headerKey,
  sampleData,
  EDIT_URL,
  VIEW_URL,
  filterData,
} from "./constants"
import {
  isOperationAllowed,
  access,
  operations,
  checkBoxCondition,
} from "../../../utils/utilities"

const Vouchers = (props) => {
  let { getVouchers } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(currentDate)
  let { loading, vouchers, downloadLoading } = props.vouchers
  const history = props.history

  useEffect(() => {
    getVouchers({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }, [getVouchers, from, to])

  const handleFileSubmit = (file) => {
    props.uploadVouchers(file, getVouchers)
  }

  const handleDownload = () => {
    props.downloadVouchers({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }

  const handleDeleteAgree = () => {
    const cb = () => {
      setFrom(currentDate)
      setTo(currentDate)
      props.getVouchers({
        from: moment(from).toISOString(),
        to: moment(to).toISOString(),
      })
      setSelected([])
    }
    props.deleteVouchers(selected, cb)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_VOUCHER)
  }

  const handleEditButton = () => {
    const voucherId = selected[0]
    const searchId = vouchers.filter((val) => val._id === voucherId)
    history.push(EDIT_URL(searchId[0]._id))
  }

  vouchers = filterData(vouchers, search)

  const tableRow = [...header, "Added By"].map((headCell, index) => (
    <TableCell style={{ fontWeight: "600" }} key={index}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return [...headerKey, "addedBy"].map((headVal, index) => {
      return (
        <TableCell key={index}>
          {headVal === "diNo" ? (
            <Link to={VIEW_URL(row._id)}>{row[headVal]}</Link>
          ) : (
            row[headVal]
          )}
        </TableCell>
      )
    })
  }

  return (
    <Layout
      title="Vouchers"
      handleDeleteAgree={
        isOperationAllowed(access.VOUCHERS, operations.DELETE) &&
        handleDeleteAgree
      }
      handleFileSubmit={
        isOperationAllowed(access.VOUCHERS, operations.CREATE) &&
        handleFileSubmit
      }
      search={search}
      setSearch={setSearch}
      data={vouchers}
      mssgTitle="Vouchers"
      mssg="No Vouchers found on Selected Date Interval"
      loading={loading}
      tableRow={tableRow}
      tableBodyFunc={tableBodyFunc}
      numSelected={selected}
      setNumSelected={setSelected}
      checkBoxCondition={checkBoxCondition}
      sampleName="vouchersample"
      handleAddButton={
        isOperationAllowed(access.VOUCHERS, operations.CREATE) &&
        handleAddButton
      }
      handleEditButton={
        isOperationAllowed(access.VOUCHERS, operations.EDIT) && handleEditButton
      }
      setSelectedFrom={setFrom}
      setSelectedTo={setTo}
      selectedFrom={from}
      selectedTo={to}
      sampleData={sampleData}
      downloadLoading={downloadLoading}
      handleDownload={handleDownload}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    vouchers: state.vouchers,
    user: state.user,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getVouchers,
    deleteVouchers,
    uploadVouchers,
    downloadVouchers,
  })(Vouchers)
)
