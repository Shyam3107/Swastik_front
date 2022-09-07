import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { getReceipt } from "../../containers/Receipt/action"
import AddReceipt from "./AddReceipt"

const Receipt = (props) => {
  let { receipts } = props.receipt
  const params = useParams()
  const { getReceipt } = props
  const { receiptId } = params

  useEffect(() => {
    getReceipt({ receiptId })
  }, [receiptId, getReceipt])

  if (receipts && Array.isArray(receipts)) receipts = null

  return <AddReceipt initialFields={receipts} />
}

const mapStateToProps = (state) => {
  return {
    receipt: state.receipt,
  }
}

export default connect(mapStateToProps, { getReceipt })(Receipt)
