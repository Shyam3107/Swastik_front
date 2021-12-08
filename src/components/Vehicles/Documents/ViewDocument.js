import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";

import { formatDate, ROUTES } from "../../../utils/constants";
import {
  getDocuments,
  deleteDocuments,
} from "../../../containers/Documents/action";
import LayoutView from "../../Layout/LayoutView";
import { header, headerKey, EDIT_URL } from "./constants";

const ViewDocument = (props) => {
  const history = useHistory();
  const params = useParams();
  const { vehicleNo } = params;
  let { loading, documents } = props.documents;
  const { getDocuments } = props;

  let fields = [];
  let selected = [];

  if (documents && !Array.isArray(documents)) {
    fields = header.map((head, index) => {
      return {
        label: head,
        id: headerKey[index],
        value: index > 0 ? formatDate(documents[headerKey[index]]) : null,
      };
    });
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
      viewFields={fields}
      handleBack={handleBack}
      handleDeleteAgree={handleDeleteAgree}
      handleAddButton={handleAddButton}
      handleEditButton={handleEditButton}
      numSelected={selected}
    />
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
