import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { formatDate, ROUTES } from "../../../utils/constants";
import {
  getDocuments,
  deleteDocuments,
} from "../../../containers/Documents/action";
import LayoutView from "../../Layout/LayoutView";
import { EDIT_URL } from "./constants";

const ViewDocument = (props) => {
  const history = useHistory();
  const params = useParams();
  const { vehicleNo } = params;
  let { loading, documents } = props.documents;
  const { getDocuments } = props;

  let selected = [];

  if (documents && !Array.isArray(documents)) {
    selected = [];
    selected.push(documents._id);
  } else documents = {};

  useEffect(() => {
    getDocuments({ vehicleNo });
  }, [vehicleNo, getDocuments]);

  const handleBack = () => {
    history.push(ROUTES.DOCUMENTS);
  };

  const handleDeleteAgree = () => {
    props.deleteDocuments(selected, handleBack);
  };

  const handleAddButton = () => {
    history.push(ROUTES.ADD_DOCUMENT);
  };

  const handleEditButton = () => {
    history.push(EDIT_URL(documents.vehicleNo));
  };

  return (
    <LayoutView
      title={vehicleNo}
      loading={loading}
      data={documents}
      handleBack={handleBack}
      handleDeleteAgree={handleDeleteAgree}
      handleAddButton={handleAddButton}
      handleEditButton={handleEditButton}
      numSelected={selected}
    >
      <TableContainer style={{ marginRight: "3%", width: "95%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell style={{ fontWeight: "600" }}>Paid On</TableCell>
              <TableCell style={{ fontWeight: "600" }}>Validity Upto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ fontWeight: "600" }}>Tax</TableCell>
              <TableCell>{formatDate(documents.taxPaidOn)}</TableCell>
              <TableCell>{formatDate(documents.taxPaidUpto)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: "600" }}>Insurance</TableCell>
              <TableCell>{formatDate(documents.insurancePaidOn)}</TableCell>
              <TableCell>{formatDate(documents.insurancePaidUpto)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: "600" }}>Fitness</TableCell>
              <TableCell>{formatDate(documents.fitnessPaidOn)}</TableCell>
              <TableCell>{formatDate(documents.fitnessPaidUpto)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutView>
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
  };
};

export default connect(mapStateToProps, { getDocuments, deleteDocuments })(
  ViewDocument
);
