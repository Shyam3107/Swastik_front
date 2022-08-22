import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import LayoutAdd from "../../Layout/LayoutAdd"
import {
  addLogistics,
  editLogistics,
} from "../../../containers/Logistics/action"
import { getProductsName } from "../../../containers/Products/action"
import { ROUTES } from "../../../utils/constants"

const initialLogistic = {
  date: new Date().toISOString(),
  product: null,
  quantity: "1",
  vehicleNo: "",
  personName: "",
  personPhone: "",
  status: "ISSUED",
  remarks: "",
}

const Logistic = (props) => {
  const [logistic, setLogistic] = useState(initialLogistic)
  const { initialFields, getProductsName } = props
  const { productsName = [], loading: productLoading } = props.products
  const history = props.history
  let { loading } = props.logistics
  loading = loading || productLoading

  useEffect(() => {
    if (initialFields) setLogistic(initialFields)
    getProductsName()
  }, [initialFields, getProductsName])

  const inputFields = [
    {
      id: "date",
      type: "date",
      handleChange: (date) => setLogistic({ ...logistic, date }),
      label: "Date",
      maxDate: new Date().toISOString(),
    },
    {
      id: "product",
      label: "Product",
      required: true,
      type: "selectAutoComplete",
      options: (productsName ?? []).map((val) => {
        return { label: val.name, id: val._id }
      }),
    },
    { id: "quantity", label: "Quantity", type: "number", required: true },
    { id: "vehicleNo", label: "Vehicle No.", required: true },
    { id: "personName", label: "Person Name", required: true },
    {
      id: "personPhone",
      label: "Person Phone",
      type: "number",
      required: true,
      customValidate: [{ type: "PHONE" }],
    },
    {
      id: "status",
      label: "Status",
      required: true,
      type: "select",
      menuItems: [
        { label: "RECEIVED", value: "RECEIVED" },
        { label: "ISSUED", value: "ISSUED" },
      ],
    },
    { id: "remarks", label: "Remarks" },
  ]

  const handleValueChange = (e) => {
    setLogistic({ ...logistic, [e.target.name]: e.target.value })
  }

  const handleCancel = () => {
    history.push(ROUTES.LOGISTIC)
  }

  const handleReset = () => {
    if (initialFields) setLogistic(initialFields)
    else setLogistic(initialLogistic)
  }

  const handleSubmit = () => {
    const cb = () => {
      history.push(ROUTES.LOGISTIC)
    }
    if (initialFields) props.editLogistics(logistic, cb)
    else props.addLogistics(logistic, cb)
  }

  return (
    <LayoutAdd
      title="Logistic"
      inputFields={inputFields}
      handleValueChange={handleValueChange}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      data={logistic}
      loading={loading}
      edit={initialFields ? true : false}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    logistics: state.logistics,
    products: state.products,
    user: state.user,
  }
}

export default withRouter(
  connect(mapStateToProps, { addLogistics, editLogistics, getProductsName })(
    Logistic
  )
)
