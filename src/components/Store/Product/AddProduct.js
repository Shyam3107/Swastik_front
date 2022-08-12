import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import LayoutAdd from "../../Layout/LayoutAdd"
import { addProducts, editProducts } from "../../../containers/Products/action"
import { ROUTES } from "../../../utils/constants"

const initialProduct = {
    name: "",
    remarks: "",
}

const Product = (props) => {
    const [product, setProduct] = useState(initialProduct)
    const { initialFields } = props
    const history = props.history
    const { loading } = props.products

    useEffect(() => {
        if (initialFields) setProduct(initialFields)
    }, [initialFields])

    const inputFields = [
        { id: "name", label: "Name", required: true },
        { id: "remarks", label: "Remarks" },
    ]

    const handleValueChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleCancel = () => {
        history.push(ROUTES.PRODUCT)
    }

    const handleReset = () => {
        if (initialFields) setProduct(initialFields)
        else setProduct(initialProduct)
    }

    const handleSubmit = () => {
        const cb = () => {
            history.push(ROUTES.PRODUCT)
        }
        if (initialFields) props.editProducts(product, cb)
        else props.addProducts(product, cb)
    }

    return (
        <LayoutAdd
            title="Product"
            inputFields={inputFields}
            handleValueChange={handleValueChange}
            handleCancel={handleCancel}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
            data={product}
            loading={loading}
            edit={initialFields ? true : false}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        user: state.user,
    }
}

export default withRouter(
    connect(mapStateToProps, { addProducts, editProducts })(Product)
)
