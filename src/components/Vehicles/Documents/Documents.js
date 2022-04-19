import { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"
import TableCell from "@mui/material/TableCell"

import {
  getDocuments,
  deleteDocuments,
  uploadDocuments,
} from "../../../containers/Documents/action"
import Layout from "../../Layout/Layout"
import {
  formatDateInDDMMYYY,
  includesInArray,
  ROUTES,
  validateUrlValid,
} from "../../../utils/constants"
import {
  header,
  headerKey,
  sampleData,
  EXPIRED,
  ACTIVE,
  EDIT_URL,
  VIEW_URL,
  tableHeaderKey,
  tableHeader,
} from "./constants"

const Documents = (props) => {
  let { getDocuments } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  let {
    loading,
    documents,
    addLoading,
    editLoading,
    deleteLoading,
    uploadLoading,
  } = props.documents
  const history = props.history
  const user = props.user.user

  useEffect(() => {
    getDocuments()
  }, [getDocuments])

  const handleFileSubmit = (file) => {
    props.uploadDocuments(file, getDocuments)
  }

  if (!documents || !Array.isArray(documents)) documents = []

  let tempDocuments = []
  let downloadData = []
  let downloadHeaders = [...header]
  let downloadHeadersKey = [...headerKey]

  if (user && user._id === user.companyAdminId._id) {
    downloadHeadersKey = [...headerKey, "googleDriveLink"]
    downloadHeaders = [...header, "Google Drive Link"]
  }

  documents.forEach((val) => {
    val.taxStatus = moment(val.taxPaidUpto).isBefore(moment())
      ? EXPIRED
      : ACTIVE

    val.insuranceStatus = moment(val.insurancePaidUpto).isBefore(moment())
      ? EXPIRED
      : ACTIVE

    val.fitnessStatus = moment(val.fitnessPaidUpto).isBefore(moment())
      ? EXPIRED
      : ACTIVE

    val.pollutionStatus = moment(val.pollutionPaidUpto).isBefore(moment())
      ? EXPIRED
      : ACTIVE

    const searchIn = [
      val.vehicleNo,
      val.taxStatus,
      val.insuranceStatus,
      val.fitnessStatus,
      val.pollutionStatus,
      val.addedBy && val.addedBy.location ? val.addedBy.location : "",
    ]

    downloadData.push(
      [...downloadHeadersKey, "addedBy"].map((item, index) => {
        if (item === "addedBy") return val.addedBy ? val.addedBy.location : ""
        if (index > 0 && item !== "googleDriveLink")
          return formatDateInDDMMYYY(val[item])
        return val[item]
      })
    )

    if (includesInArray(searchIn, search)) tempDocuments.push(val)
  })

  documents = tempDocuments
  downloadData = [[...downloadHeaders, "Added By"], ...downloadData]

  const tableRow = [...tableHeader, "Added By"].map((headCell, index) => (
    <TableCell key={index} style={{ fontWeight: "600" }}>
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return [...tableHeaderKey, "addedBy"].map((headVal, index) => {
      if (headVal === "vehicleNo")
        return (
          <TableCell key={index}>
            <Link to={VIEW_URL(row[headVal])}>{row[headVal]}</Link>
          </TableCell>
        )
      if (headVal === "addedBy")
        return (
          <TableCell key={index}>
            {row.addedBy ? row.addedBy.location : ""}
          </TableCell>
        )
      if (headVal === "googleDriveLink")
        return (
          <TableCell key={index}>
            {validateUrlValid(row[headVal]) && (
              <a href={row[headVal]} target="_blank" rel="noreferrer">
                Click here
              </a>
            )}
          </TableCell>
        )
      return (
        <TableCell key={index}>
          <span
            style={{
              backgroundColor: row[headVal] === ACTIVE ? "green" : "#8b0000",
              padding: "10px",
              color: "white",
              borderRadius: "10%",
            }}
          >
            {row[headVal]}
          </span>
        </TableCell>
      )
    })
  }

  const handleDeleteAgree = () => {
    const cb = () => {
      props.getDocuments()
      setSelected([])
    }
    props.deleteDocuments(selected, cb)
  }

  const handleAddButton = () => {
    history.push(ROUTES.ADD_DOCUMENT)
  }

  const handleEditButton = () => {
    const vehicleId = selected[0]
    const searchId = documents.filter((val) => val._id === vehicleId)
    history.push(EDIT_URL(searchId[0].vehicleNo))
  }

  const checkBoxCondition = (row) => {
    return row.addedBy._id === user._id || user._id === user.companyAdminId._id
  }

  return (
    <Layout
      title="Documents"
      handleDeleteAgree={handleDeleteAgree}
      handleFileSubmit={handleFileSubmit}
      tableBodyFunc={tableBodyFunc}
      setNumSelected={setSelected}
      handleAddButton={handleAddButton}
      handleEditButton={handleEditButton}
      checkBoxCondition={checkBoxCondition}
      setSearch={setSearch}
      search={search}
      data={documents}
      mssgTitle="Documents"
      loading={loading}
      tableRow={tableRow}
      numSelected={selected}
      fileName="documents"
      sampleName="documentSample"
      sampleData={sampleData}
      downloadData={downloadData}
      addLoading={addLoading || uploadLoading}
      editLoading={editLoading}
      deleteLoading={deleteLoading}
      downloadLoading={addLoading}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    user: state.user,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getDocuments,
    deleteDocuments,
    uploadDocuments,
  })(Documents)
)
