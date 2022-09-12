import { useState, useEffect, Fragment } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import TableCell from "@mui/material/TableCell"

import {
  getDocuments,
  deleteDocuments,
  uploadDocuments,
  downloadDocuments,
} from "../../../containers/Documents/action"
import Layout from "../../Layout/Layout"
import { ROUTES, validateUrlValid } from "../../../utils/constants"
import {
  sampleData,
  EXPIRED,
  EDIT_URL,
  VIEW_URL,
  tableHeaderKey,
  tableHeader,
  filterData,
} from "./constants"
import {
  access,
  isOperationAllowed,
  operations,
  checkBoxCondition,
} from "../../../utils/utilities"

const Documents = (props) => {
  let { getDocuments } = props
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState([])
  let { loading, documents, documentsLink, downloadLoading } = props.documents
  const history = props.history

  useEffect(() => {
    getDocuments()
  }, [getDocuments])

  const handleFileSubmit = (file) => {
    props.uploadDocuments(file, getDocuments)
  }

  const handleDownload = () => {
    props.downloadDocuments()
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

  if (!documents || !Array.isArray(documents)) documents = []

  documents = filterData(documents, search)

  const tableRow = [...tableHeader, "Added By"].map((headCell) => (
    <TableCell
      key={headCell}
      style={{ fontWeight: "600", textAlign: "center" }}
    >
      {headCell}
    </TableCell>
  ))

  const tableBodyFunc = (row) => {
    return [...tableHeaderKey, "addedBy"].map((headVal) => {
      if (headVal === "vehicleNo")
        return (
          <TableCell key={headVal}>
            <Link to={VIEW_URL(row[headVal])}>{row[headVal]}</Link>
          </TableCell>
        )
      if (headVal === "addedBy")
        return <TableCell key={headVal}>{row[headVal]}</TableCell>
      return (
        <TableCell
          key={headVal}
          style={{ padding: "5px", textAlign: "center" }}
        >
          <span
            style={{
              backgroundColor: row[headVal] === EXPIRED ? "#8b0000" : "green",
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

  return (
    <Fragment>
      <Layout
        title="Documents"
        handleDeleteAgree={
          isOperationAllowed(access.DOCUMENTS, operations.DELETE) &&
          handleDeleteAgree
        }
        handleFileSubmit={
          isOperationAllowed(access.DOCUMENTS, operations.CREATE) &&
          handleFileSubmit
        }
        tableBodyFunc={tableBodyFunc}
        setNumSelected={setSelected}
        handleAddButton={
          isOperationAllowed(access.DOCUMENTS, operations.CREATE) &&
          handleAddButton
        }
        handleEditButton={
          isOperationAllowed(access.DOCUMENTS, operations.EDIT) &&
          handleEditButton
        }
        checkBoxCondition={checkBoxCondition}
        setSearch={setSearch}
        search={search}
        data={documents}
        mssgTitle="Documents"
        loading={loading}
        tableRow={tableRow}
        numSelected={selected}
        sampleName="documentSample"
        sampleData={sampleData}
        downloadLoading={downloadLoading}
        handleDownload={handleDownload}
      />
      {validateUrlValid(documentsLink) && (
        <p style={{ marginLeft: "10px" }}>
          <a target="_blank" href={documentsLink} rel="noreferrer">
            Click here
          </a>{" "}
          to view the Documents{" "}
        </p>
      )}
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getDocuments,
    deleteDocuments,
    uploadDocuments,
    downloadDocuments,
  })(Documents)
)
