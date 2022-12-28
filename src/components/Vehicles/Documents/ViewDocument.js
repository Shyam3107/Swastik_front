import React, { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { withRouter } from "react-router"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

import { formatDate, ROUTES } from "../../../utils/constants"
import {
  getDocuments,
  deleteDocuments,
} from "../../../containers/Documents/action"
import LayoutView from "../../Layout/LayoutView"
import { EDIT_URL } from "./constants"
import {
  access,
  isOperationAllowed,
  operations,
} from "../../../utils/utilities"

const ViewDocument = (props) => {
  const history = props.history
  const params = useParams()
  const { vehicleNo } = params
  let { loading, documents } = props.documents
  const { getDocuments } = props

  let selected = []

  if (documents && !Array.isArray(documents)) {
    selected = []
    selected.push(documents._id)
  } else documents = {}

  useEffect(() => {
    getDocuments({ vehicleNo })
  }, [vehicleNo, getDocuments])

  const handleBack = () => {
    history.push(ROUTES.DOCUMENTS)
  }

  const handleDeleteAgree = () => {
    props.deleteDocuments(selected, handleBack)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_DOCUMENT)
  }

  const handleEditButton = () => {
    history.push(EDIT_URL(documents.vehicleNo))
  }

  const data = [
    { title: "Tax", value: formatDate(documents.taxPaidUpto) },
    { title: "Insurance", value: formatDate(documents.insurancePaidUpto) },
    { title: "Fitness", value: formatDate(documents.fitnessPaidUpto) },
    { title: "Permit", value: formatDate(documents.permitPaidUpto) },
    {
      title: "National Permit",
      value: formatDate(documents.nationalPermitPaidUpto),
    },
    {
      title: "Is National Permit",
      value: documents?.isNationalPermit ? "YES" : "NO"
    }
  ]

  return (
    <LayoutView
      title={vehicleNo}
      loading={loading}
      data={documents}
      handleBack={handleBack}
      handleDeleteAgree={
        isOperationAllowed(access.DOCUMENTS, operations.DELETE, documents) &&
        handleDeleteAgree
      }
      handleAddButton={
        isOperationAllowed(access.DOCUMENTS, operations.CREATE) &&
        handleAddButton
      }
      handleEditButton={
        isOperationAllowed(access.DOCUMENTS, operations.EDIT, documents) &&
        handleEditButton
      }
      numSelected={selected}
    >
      <TableContainer style={{ marginRight: "3%", width: "95%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell style={{ fontWeight: "600" }}>Validity Upto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((val) => {
              return (
                <TableRow key={val.title}>
                  <TableCell style={{ fontWeight: "600" }}>
                    {val.title}
                  </TableCell>
                  <TableCell>{val.value}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutView>
  )
}

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
  }
}

export default withRouter(
  connect(mapStateToProps, { getDocuments, deleteDocuments })(ViewDocument)
)
