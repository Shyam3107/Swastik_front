import React, { useEffect, useState } from "react"
import moment from "moment"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { withRouter } from "react-router"
import TableCell from "@mui/material/TableCell"
import { Link } from "react-router-dom"

import { ROUTES, monthStart, currentDate } from "../../../utils/constants"
import {
  getProducts,
  downloadProductsById,
  deleteProducts,
} from "../../../containers/Products/action"
import LayoutView from "../../Layout/LayoutView"
import { headerKey, EDIT_URL } from "./constants"
import {
  access,
  isOperationAllowed,
  operations,
  checkBoxCondition,
} from "../../../utils/utilities"
import CustomTableOutput from "../../CustomComponents/CustomTableOutput/CustomTableOutput"
import {
  header as logisticHeader,
  headerKey as logisticHeaderKey,
  EDIT_URL as EDIT_LOGISTIC_URL,
  filterData,
} from "../Logistic/constants"

const ViewProduct = (props) => {
  const history = props.history
  const [search, setSearch] = useState("")
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(currentDate)
  const params = useParams()
  const { productId } = params
  let { loading, products, downloadLoading } = props.products
  const { getProducts } = props
  let logistics = products?.logistics ?? []
  let periodQuantity = products?.periodQuantity
  products = products?.products

  let fields = []
  let selected = []

  logistics = filterData(logistics, search)

  if (products && !Array.isArray(products)) {
    fields = ["Quantity", "Remarks", "Opening Quantity"].map((head, index) => {
      return {
        label: head,
        id: headerKey[index + 1],
        value:
          index === 2
            ? (products?.quantity - periodQuantity)?.toString()
            : null,
      }
    })
    selected.push(products?._id)
  }

  useEffect(() => {
    getProducts({
      productId,
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }, [productId, from, to, getProducts])

  const handleBack = () => {
    history.push(ROUTES.PRODUCT)
  }

  const handleDeleteAgree = () => {
    props.deleteProducts(selected, handleBack)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_PRODUCT)
  }

  const handleEditButton = () => {
    history.push(EDIT_URL(products?._id))
  }

  const handleDownload = () => {
    props.downloadProductsById({
      productId,
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }

  const tableRow = logisticHeader.map((headCell, index) => (
    <TableCell style={{ fontWeight: "600" }} key={index}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return logisticHeaderKey.map((headVal, index) => {
      return (
        <TableCell key={index}>
          {index === 0 ? (
            <Link to={EDIT_LOGISTIC_URL(row._id)}>{row[headVal]}</Link>
          ) : headVal === "product" ? (
            products.name
          ) : (
            row[headVal]
          )}
        </TableCell>
      )
    })
  }

  return (
    <LayoutView
      title={products?.name}
      loading={loading}
      data={products}
      viewFields={fields}
      search={search}
      setSearch={setSearch}
      selectedFrom={from}
      setSelectedFrom={setFrom}
      selectedTo={to}
      setSelectedTo={setTo}
      handleBack={handleBack}
      handleDeleteAgree={
        isOperationAllowed(access.PRODUCTS, operations.DELETE, products) &&
        handleDeleteAgree
      }
      handleAddButton={
        isOperationAllowed(access.PRODUCTS, operations.CREATE) &&
        handleAddButton
      }
      handleEditButton={
        isOperationAllowed(access.PRODUCTS, operations.EDIT, products) &&
        handleEditButton
      }
      numSelected={selected}
      downloadLoading={downloadLoading}
      handleDownload={handleDownload}
    >
      <CustomTableOutput
        data={logistics}
        mssgTitle="Logistics"
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
    user: state.user,
    products: state.products,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getProducts,
    deleteProducts,
    downloadProductsById,
  })(ViewProduct)
)
