import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { getBills } from "../../../containers/HardwareShopBills/action"
import AddBill from "./AddBill"

const Bill = (props) => {
  let { bills } = props.bills
  const params = useParams()
  const { getBills } = props
  const { billId } = params

  useEffect(() => {
    getBills({ billId })
  }, [billId, getBills])

  if (bills && Array.isArray(bills)) bills = null

  return <AddBill initialFields={bills} />
}

const mapStateToProps = (state) => {
  return {
    bills: state.hardwareShopBills,
  }
}

export default connect(mapStateToProps, { getBills })(Bill)
