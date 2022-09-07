import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { getExpense } from "../../../containers/OfficeExpense/action"
import AddOffice from "./AddOffice"

const EditOffice = (props) => {
  let { expenses } = props.officeExpense
  const params = useParams()
  const { getExpense } = props
  const { expenseId } = params

  useEffect(() => {
    getExpense({ expenseId })
  }, [expenseId, getExpense])

  if (expenses && Array.isArray(expenses)) expenses = null

  return <AddOffice initialFields={expenses} />
}

const mapStateToProps = (state) => {
  return {
    officeExpense: state.officeExpense,
  }
}

export default connect(mapStateToProps, { getExpense })(EditOffice)
