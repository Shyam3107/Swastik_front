import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { getDiesel } from "../../../containers/Diesels/action"
import AddDiesels from "./AddDiesels"

const EditDiesels = (props) => {
  let { diesels } = props.diesels
  const params = useParams()
  const { getDiesel } = props
  const { dieselId } = params

  useEffect(() => {
    getDiesel({ dieselId })
  }, [dieselId, getDiesel])

  if (diesels && Array.isArray(diesels)) diesels = null

  return <AddDiesels initialFields={diesels} />
}

const mapStateToProps = (state) => {
  return {
    diesels: state.diesels,
  }
}

export default connect(mapStateToProps, { getDiesel })(EditDiesels)
