import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import LayoutAdd from "../Layout/LayoutAdd"
import { addReceipt, editReceipt } from "../../containers/Receipt/action"
import { ROUTES } from "../../utils/constants"

const initialReceipt = {
  date: new Date().toISOString(),
  amount: 0,
  remarks: "",
}

const Receipt = (props) => {
  const [receipt, setReceipt] = useState(initialReceipt)
  const { initialFields } = props
  const history = props.history
  const { loading } = props.receipt

  useEffect(() => {
    if (initialFields) setReceipt(initialFields)
  }, [initialFields])

  const inputFields = [
    {
      id: "date",
      type: "date",
      handleChange: (date) => setReceipt({ ...receipt, date }),
      label: "Date",
      maxDate: new Date().toISOString(),
    },
    { id: "amount", type: "number", label: "Amount", required: true },
    { id: "remarks", label: "Remarks", required: true },
  ]

  const handleValueChange = (e) => {
    setReceipt({ ...receipt, [e.target.name]: e.target.value })
  }

  const handleCancel = () => {
    history.push(ROUTES.RECEIPT)
  }

  const handleReset = () => {
    if (initialFields) setReceipt(initialFields)
    else setReceipt(initialReceipt)
  }

  const handleSubmit = () => {
    const cb = () => {
      history.push(ROUTES.RECEIPT)
    }
    if (initialFields) props.editReceipt(receipt, cb)
    else props.addReceipt(receipt, cb)
  }

  return (
    <LayoutAdd
      title="Receipt"
      inputFields={inputFields}
      handleValueChange={handleValueChange}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      data={receipt}
      loading={loading}
      edit={initialFields ? true : false}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    receipt: state.receipt,
  }
}

export default withRouter(
  connect(mapStateToProps, { addReceipt, editReceipt })(Receipt)
)
