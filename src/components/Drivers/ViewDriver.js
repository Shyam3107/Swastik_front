import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { withRouter } from "react-router";

import { formatDate, ROUTES } from "../../utils/constants";
import { getDrivers, deleteDriver } from "../../containers/Drivers/action";
import LayoutView from "../Layout/LayoutView";
import { header, headerKey, EDIT_URL } from "./constants";
import {
  access,
  isOperationAllowed,
  operations,
} from "../../utils/utilities";

const ViewTrip = (props) => {
  const history = props.history;
  const params = useParams();
  const { id } = params;
  let { loading, drivers } = props.drivers;
  const { getDrivers } = props;

  let fields = [];
  let selected = [];

  if (drivers && !Array.isArray(drivers)) {
    fields = header.map((head, index) => {
      return {
        label: head,
        id: headerKey[index],
        value:
          head === "Aadhar Card DOB" ||
          head === "DL DOB" ||
            head === "DL Validity" 
            ? formatDate(drivers[headerKey[index]])
            : null,
      };
    });
    selected.push(drivers._id);
  } else drivers = { addedBy: {} };

  useEffect(() => {
    getDrivers({ id });
  }, [id, getDrivers]);

  const handleBack = () => {
    history.push(ROUTES.DRIVERS);
  };

  const handleDeleteAgree = () => {
    props.deleteDrivers(selected, handleBack);
  };

  const handleAddButton = () => {
    history.push(ROUTES.ADD_DRIVERS);
  };

  const handleEditButton = () => {
    history.push(EDIT_URL(drivers._id));
  };

  return (
    <React.Fragment>
      <LayoutView
        title={id}
        loading={loading}
        data={drivers}
        viewFields={fields}
        handleBack={handleBack}
        handleDeleteAgree={
          isOperationAllowed(access.DRIVERS, operations.DELETE, drivers) &&
          handleDeleteAgree
        }
        handleAddButton={
          isOperationAllowed(access.DRIVERS, operations.CREATE) && handleAddButton
        }
        handleEditButton={
          isOperationAllowed(access.DRIVERS, operations.EDIT, drivers) &&
          handleEditButton
        }
        numSelected={selected}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    drivers: state.drivers,
  };
};

export default withRouter(
  connect(mapStateToProps, { getDrivers, deleteDriver })(ViewTrip)
);
