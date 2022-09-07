import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import TableCell from "@mui/material/TableCell"
import { Link } from "react-router-dom"

import Layout from "../../Layout/Layout"
import { ROUTES } from "../../../utils/constants"
import {
  header,
  headerKey,
  sampleData,
  EDIT_URL,
  filterData,
  VIEW_URL,
} from "./constants"
import {
  getProducts,
  deleteProducts,
  downloadProducts,
  uploadProducts,
} from "../../../containers/Products/action"
import {
  access,
  isOperationAllowed,
  operations,
} from "../../../utils/utilities"

const Product = (props) => {
  let { getProducts } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  let { loading, products, downloadLoading } = props.products
  const history = props.history

  useEffect(() => {
    getProducts()
  }, [getProducts])

  const handleDeleteAgree = () => {
    const cb = () => {
      getProducts()
      setSelected([])
    }
    props.deleteProducts(selected, cb)
  }

  const handleFileSubmit = (file) => {
    props.uploadProducts(file, getProducts)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_PRODUCT)
  }

  const handleEditButton = () => {
    const id = selected[0]
    history.push(EDIT_URL(id))
  }

  const handleDownload = () => {
    props.downloadProducts()
  }

  products = filterData(products, search)

  const tableRow = header.map((headCell, index) => (
    <TableCell style={{ fontWeight: "600" }} key={index}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return headerKey.map((headVal, index) => {
      return (
        <TableCell key={index}>
          {index === 0 ? (
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
      title="Products"
      mssgTitle="Products"
      sampleName="Products Sample"
      data={products}
      sampleData={sampleData}
      loading={loading}
      search={search}
      setSearch={setSearch}
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
    products: state.products,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getProducts,
    deleteProducts,
    downloadProducts,
    uploadProducts,
  })(Product)
)
