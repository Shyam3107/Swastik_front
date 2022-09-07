import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { getProducts } from "../../../containers/Products/action"
import AddProduct from "./AddProduct"

const Product = (props) => {
  let products = props.products?.products?.products
  const params = useParams()
  const { getProducts } = props
  const { productId } = params

  useEffect(() => {
    getProducts({ productId })
  }, [productId, getProducts])

  if (products && Array.isArray(products)) products = null

  return <AddProduct initialFields={products} />
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  }
}

export default connect(mapStateToProps, { getProducts })(Product)
