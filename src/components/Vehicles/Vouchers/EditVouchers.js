import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { getVouchers } from "../../../containers/Vouchers/action"
import AddVouchers from "./AddVouchers"

const EditVouchers = (props) => {
  let { vouchers } = props.vouchers
  const params = useParams()
  const { getVouchers } = props
  const { voucherId } = params

  useEffect(() => {
    getVouchers({ voucherId })
  }, [voucherId, getVouchers])

  if (vouchers && Array.isArray(vouchers)) vouchers = null

  return <AddVouchers initialFields={vouchers} />
}

const mapStateToProps = (state) => {
  return {
    vouchers: state.vouchers,
  }
}

export default connect(mapStateToProps, { getVouchers })(EditVouchers)
