import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TableCell from "@mui/material/TableCell";

import {
  getDocuments,
  deleteDocuments,
  uploadDocuments,
  downloadDocuments,
  downloadMissingDocuments,
  completeVehicleNum,
} from "../../../containers/Documents/action";
import Layout from "../../Layout/Layout";
import { ROUTES, validateUrlValid } from "../../../utils/constants";
import {
  sampleData,
  sampleData2,
  EXPIRED,
  ACTIVE,
  EDIT_URL,
  VIEW_URL,
  tableHeaderKey,
  tableHeader,
  filterData,
} from "./constants";
import {
  isAdmin,
  access,
  isOperationAllowed,
  operations,
  checkBoxCondition,
} from "../../../utils/utilities";

const Documents = (props) => {
  let { getDocuments } = props;
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  let { loading, documents, documentsLink, downloadLoading } = props.documents;
  const history = props.history;

  useEffect(() => {
    getDocuments();
  }, [getDocuments]);

  const handleFileSubmit = (file) => {
    props.uploadDocuments(file, getDocuments);
  };

  const handleDownload = () => {
    props.downloadDocuments();
  };

  const handleDownload2 = () => {
    props.downloadMissingDocuments();
  };

  const handleFile2Submit = (file) => {
    props.completeVehicleNum(file, () => {});
  };

  const handleDeleteAgree = () => {
    const cb = () => {
      props.getDocuments();
      setSelected([]);
    };
    props.deleteDocuments(selected, cb);
  };

  const handleAddButton = () => {
    history.push(ROUTES.ADD_DOCUMENT);
  };

  const handleEditButton = () => {
    const vehicleId = selected[0];
    const searchId = documents.filter((val) => val._id === vehicleId);
    history.push(EDIT_URL(searchId[0].vehicleNo));
  };

  if (!documents || !Array.isArray(documents)) documents = [];

  documents = filterData(documents, search);

  const tableRow = [...tableHeader, "Added By"].map((headCell) => (
    <TableCell
      key={headCell}
      style={{ fontWeight: "600", textAlign: "center" }}
    >
      {headCell}
    </TableCell>
  ));

  const tableBodyFunc = (row) => {
    return [...tableHeaderKey, "addedBy"].map((headVal) => {
      const rowValue = row[headVal];

      if (headVal === "vehicleNo")
        return (
          <TableCell key={headVal}>
            <Link to={VIEW_URL(rowValue)}>{rowValue}</Link>
          </TableCell>
        );
      if (headVal === "addedBy")
        return <TableCell key={headVal}>{rowValue}</TableCell>;

      let bgColor = "white";
      let fontColor = "black";
      const isNationalPermit = row["isNationalPermit"];

      if (
        headVal !== "nationalPermitStatus" &&
        headVal !== "isNationalPermit"
      ) {
        switch (rowValue) {
          case EXPIRED:
            bgColor = "#8b0000";
            break;
          case ACTIVE:
            bgColor = "green";
            break;
          default:
            bgColor = "#FFDF00";
        }

        fontColor = "white";
      } else {
        // National Permit part
        if (headVal === "nationalPermitStatus" && isNationalPermit === "YES") {
          switch (rowValue) {
            case EXPIRED:
              bgColor = "#8b0000";
              break;
            case ACTIVE:
              bgColor = "green";
              break;
            default:
              bgColor = "#FFDF00";
          }
          fontColor = "white";
        } else if (
          headVal === "nationalPermitStatus" &&
          isNationalPermit === "NO"
        ) {
          fontColor = "white";
        }
      }

      return (
        <TableCell
          key={headVal}
          style={{ padding: "5px", textAlign: "center" }}
        >
          <span
            style={{
              backgroundColor: bgColor,
              padding: "10px",
              color: fontColor,
              borderRadius: "10%",
            }}
          >
            {row[headVal]}
          </span>
        </TableCell>
      );
    });
  };

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
        sampleName="Document  Sample"
        sampleData={sampleData}
        downloadLoading={downloadLoading}
        handleDownload={handleDownload}
        handleDownload2={isAdmin() && handleDownload2}
        download2ToolTip="Download Missing Docs"
        sampleName2="Vehicle Number Sample"
        upload2ToolTip="Complete the Vehicle No."
        handleFile2Submit={isAdmin() && handleFile2Submit}
        sampleData2={sampleData2}
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
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
  };
};

export default React.memo(
  withRouter(
    connect(mapStateToProps, {
      getDocuments,
      deleteDocuments,
      uploadDocuments,
      downloadDocuments,
      downloadMissingDocuments,
      completeVehicleNum,
    })(Documents)
  )
);
