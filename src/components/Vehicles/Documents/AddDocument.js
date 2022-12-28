import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import LayoutAdd from "../../Layout/LayoutAdd"
import { ROUTES, formatInDayEnd } from "../../../utils/constants"
import {
  addDocuments,
  editDocuments,
} from "../../../containers/Documents/action"

const initialDocument = {
  vehicleNo: "",
  taxPaidUpto: formatInDayEnd(),
  insurancePaidUpto: formatInDayEnd(),
  fitnessPaidUpto: formatInDayEnd(),
  pollutionPaidUpto: formatInDayEnd(),
  permitPaidUpto: formatInDayEnd(),
  nationalPermitPaidUpto: formatInDayEnd(),
  isNationalPermit: false
}

const AddDocument = (props) => {
  const { loading } = props.documents
  const { initialFields } = props
  const [document, setDocument] = useState(initialDocument)
  const history = props.history

  useEffect(() => {
    if (initialFields) setDocument(initialFields)
  }, [initialFields])

  const inputFields = [
    { id: "vehicleNo", label: "Vehicle No.", required: true },
    {
      id: "taxPaidUpto",
      type: "date",
      handleChange: (date) =>
        setDocument({ ...document, taxPaidUpto: formatInDayEnd(date) }),
      label: "Tax Paid Upto",
    },
    {
      id: "insurancePaidUpto",
      type: "date",
      handleChange: (date) =>
        setDocument({
          ...document,
          insurancePaidUpto: formatInDayEnd(date),
        }),
      label: "Insurance Paid Upto",
    },
    {
      id: "fitnessPaidUpto",
      type: "date",
      handleChange: (date) =>
        setDocument({
          ...document,
          fitnessPaidUpto: formatInDayEnd(date),
        }),
      label: "Fitness Paid Upto",
    },
    {
      id: "pollutionPaidUpto",
      type: "date",
      handleChange: (date) =>
        setDocument({ ...document, pollutionPaidUpto: date }),
      label: "Pollution Paid Upto",
    },
    {
      id: "permitPaidUpto",
      type: "date",
      handleChange: (date) =>
        setDocument({
          ...document,
          permitPaidUpto: formatInDayEnd(date),
        }),
      label: "Permit Paid Upto",
    },
    {
      id: "nationalPermitPaidUpto",
      type: "date",
      handleChange: (date) =>
        setDocument({
          ...document,
          nationalPermitPaidUpto: formatInDayEnd(date),
        }),
      label: "National Permit Paid Upto",
    },
    {
      id: "isNationalPermit",
      type: "switch",
      handleChange: (val) =>
        setDocument({
          ...document,
          isNationalPermit: val,
        }),
      label: "Is National Permit",
    },
  ]

  const handleValueChange = (e) => {
    if (e.target.name === "vehicleNo")
      e.target.value = e.target.value.toUpperCase()
    setDocument({ ...document, [e.target.name]: e.target.value })
  }

  const handleCancel = () => {
    history.push(ROUTES.DOCUMENTS)
  }

  const handleReset = () => {
    if (initialFields) setDocument(initialFields)
    else setDocument(initialDocument)
  }

  const handleSubmit = () => {
    const cb = () => {
      history.push(ROUTES.DOCUMENTS)
    }
    if (initialFields) props.editDocuments(document, cb)
    else props.addDocuments(document, cb)
  }

  return (
    <LayoutAdd
      title="Documents"
      inputFields={inputFields}
      handleValueChange={handleValueChange}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      data={document}
      loading={loading}
      edit={initialFields ? true : false}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
  }
}

export default withRouter(
  connect(mapStateToProps, { addDocuments, editDocuments })(AddDocument)
)
