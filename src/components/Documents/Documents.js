import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import TableCell from "@mui/material/TableCell";

import {
  getDocuments,
  addDocuments,
  deleteDocuments,
  uploadDocuments,
} from "../../containers/Documents/action";
import uploadFileForm from "../../utils/uploadFileForm";
import Layout from "../Layout/Layout";
import {
  formatDateInDDMMYYY,
  includesInArray,
  ROUTES,
} from "../../utils/constants";
import {
  header,
  headerKey,
  sampleData,
  EXPIRED,
  ACTIVE,
  EDIT_URL,
} from "./constants";

const tableHeader = [
  "Vehicle No.",
  "Tax Status",
  "Insurance Status",
  "Fitness Status",
];

const tableHeaderKey = [
  "vehicleNo",
  "taxStatus",
  "insuranceStatus",
  "fitnessStatus",
];

const Documents = (props) => {
  let { getDocuments } = props;
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  let {
    loading,
    documents,
    addLoading,
    editLoading,
    deleteLoading,
    uploadLoading,
  } = props.documents;
  const history = useHistory();

  useEffect(() => {
    getDocuments();
  }, [getDocuments]);

  const handleFileSubmit = (file) => {
    props.uploadDocuments(uploadFileForm(file), getDocuments);
  };

  if (!documents || !Array.isArray(documents)) documents = [];

  let tempDocuments = [];
  let downloadData = [];
  documents.forEach((val) => {
    val.taxStatus = moment(val.taxPaidUpto).isBefore(moment())
      ? EXPIRED
      : ACTIVE;

    val.insuranceStatus = moment(val.insurancePaidUpto).isBefore(moment())
      ? EXPIRED
      : ACTIVE;

    val.fitnessStatus = moment(val.fitnessPaidUpto).isBefore(moment())
      ? EXPIRED
      : ACTIVE;

    const searchIn = [
      val.vehicleNo,
      val.taxStatus,
      val.insuranceStatus,
      val.fitnessStatus,
    ];

    downloadData.push(
      headerKey.map((item, index) => {
        if (index > 0) return formatDateInDDMMYYY(val[item]);
        return val[item];
      })
    );

    if (includesInArray(searchIn, search)) tempDocuments.push(val);
  });

  documents = tempDocuments;

  downloadData = [header, ...downloadData];

  const tableRow = tableHeader.map((headCell, index) => (
    <TableCell key={index} style={{ fontWeight: "600" }}>
      {headCell}
    </TableCell>
  ));

  const tableBodyFunc = (row) => {
    return tableHeaderKey.map((headVal, index) => {
      if (headVal === "vehicleNo")
        return (
          <TableCell key={index}>
            <Link to={`/vehicles/document/${row[headVal]}`}>
              {row[headVal]}
            </Link>
          </TableCell>
        );
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
      );
    });
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

  return (
    <Layout
      title="Documents"
      handleDeleteAgree={handleDeleteAgree}
      handleFileSubmit={handleFileSubmit}
      tableBodyFunc={tableBodyFunc}
      setNumSelected={setSelected}
      handleAddButton={handleAddButton}
      handleEditButton={handleEditButton}
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
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  getDocuments,
  addDocuments,
  deleteDocuments,
  uploadDocuments,
})(Documents);
