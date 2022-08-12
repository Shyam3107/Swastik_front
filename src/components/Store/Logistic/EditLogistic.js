import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { getLogistics } from "../../../containers/Logistics/action"
import AddLogistic from "./AddLogistic"

const Logistic = (props) => {
  let { logistics } = props.logistics
  const params = useParams()
  const { getLogistics } = props
  const { logisticId } = params

  useEffect(() => {
    getLogistics({ logisticId })
  }, [logisticId, getLogistics])

  if (logistics && Array.isArray(logistics)) logistics = null
  if (logistics)
    logistics = { ...logistics, product: logistics?.product?._id ?? '' }

  return <AddLogistic initialFields={logistics} />
}

const mapStateToProps = (state) => {
  return {
    logistics: state.logistics,
    user: state.user,
  }
}

export default connect(mapStateToProps, { getLogistics })(Logistic)
