import React, { useEffect, useState } from "react"
import moment from "moment"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { withRouter } from "react-router"
import TableCell from "@mui/material/TableCell"
import { Link } from "react-router-dom"

import { ROUTES, monthStart, currentDate } from "../../../utils/constants"
import {
  getBills,
  downloadBills,
} from "../../../containers/HardwareShopBills/action"
import LayoutView from "../../Layout/LayoutView"
import {
  header,
  headerKey,
  filterData,
  VIEW_SHOP_URL,
  EDIT_URL,
} from "./constants"
import {
  access,
  isOperationAllowed,
  operations,
  checkBoxCondition,
} from "../../../utils/utilities"
import CustomTableOutput from "../../CustomComponents/CustomTableOutput/CustomTableOutput"

import { API } from "../../../APIs/APIs"

const Comp = (props) => {
  const history = props.history
  const [search, setSearch] = useState("")
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(currentDate)
  const params = useParams()
  const { vehicleNo } = params
  const { getBills } = props
  let { loading, downloadLoading, bills } = props.bills
  const tableData = filterData(bills?.data ?? [], search)
  const mssgTitle = "Bills"

  let selected = []

  let fields = ["Total Amount"].map((head) => {
    return {
      label: head,
      id: head,
      value: bills?.totalAmount ?? "0",
    }
  })

  useEffect(() => {
    getBills({
      url: API.GET_BILLS_BY_VEHICLE,
      vehicleNo,
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }, [getBills, from, to, vehicleNo])

  const handleBack = () => {
    history.push(ROUTES.HARDWARE_SHOP_BILL)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_HARDWARE_SHOP_BILL)
  }

  const handleDownload = () => {
    props.downloadBills({
      url: API.DOWNLOAD_BILLS_BY_VEHICLE,
      vehicleNo,
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }

  const tableRow = header.map((headCell) => (
    <TableCell style={{ fontWeight: "600" }} key={headCell}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return headerKey.map((headVal) => {
      return (
        <TableCell key={headVal}>
          {headVal === "shopName" ? (
            <Link to={VIEW_SHOP_URL(row.shopName)}>{row[headVal]}</Link>
          ) : headVal === "date" ? (
            <Link to={EDIT_URL(row._id)}>{row[headVal]}</Link>
          ) : (
            row[headVal]
          )}
        </TableCell>
      )
    })
  }

  return (
    <LayoutView
      title={vehicleNo}
      loading={loading}
      data={bills}
      viewFields={fields}
      search={search}
      setSearch={setSearch}
      selectedFrom={from}
      setSelectedFrom={setFrom}
      selectedTo={to}
      setSelectedTo={setTo}
      handleBack={handleBack}
      handleAddButton={
        isOperationAllowed(access.STORE_BILLS, operations.CREATE) &&
        handleAddButton
      }
      numSelected={selected}
      downloadLoading={downloadLoading}
      handleDownload={handleDownload}
    >
      <CustomTableOutput
        data={tableData}
        mssgTitle={mssgTitle}
        loading={loading}
        tableRow={tableRow}
        tableBodyFunc={tableBodyFunc}
        //numSelected={numSelected}
        //setNumSelected={setNumSelected}
        checkBoxCondition={checkBoxCondition}
        selectedFrom={setFrom}
        selectedTo={setTo}
      />
    </LayoutView>
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
    downloadBills,
  })(Comp)
)
