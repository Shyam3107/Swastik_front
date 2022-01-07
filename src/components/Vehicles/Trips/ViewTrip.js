import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { withRouter } from "react-router";

import styles from "./styles.module.css";
import { formatDate, ROUTES } from "../../../utils/constants";
import { getTrips, deleteTrips } from "../../../containers/Trips/action";
import LayoutView from "../../Layout/LayoutView";
import { header, headerKey, EDIT_URL } from "./constants";
import PrintTrip from "./PrintTrip";

const ViewTrip = (props) => {
  const history = props.history;
  const params = useParams();
  const { diNo } = params;
  let { loading, trips } = props.trips;
  const { getTrips } = props;

  let fields = [];
  let selected = [];

  if (trips && !Array.isArray(trips)) {
    fields = header.map((head, index) => {
      return {
        label: head,
        id: headerKey[index],
        value: head === "Date" ? formatDate(trips[headerKey[index]]) : null,
      };
    });
    selected.push(trips._id);
  } else trips = {};

  useEffect(() => {
    getTrips({ diNo });
  }, [diNo, getTrips]);

  const handleBack = () => {
    history.push(ROUTES.TRIPS);
  };

  const handleDeleteAgree = () => {
    props.deleteTrips(selected, handleBack);
  };

  const handleAddButton = () => {
    history.push(ROUTES.ADD_TRIP);
  };

  const handleEditButton = () => {
    history.push(EDIT_URL(trips.diNo));
  };

  return (
    <React.Fragment>
      <PrintTrip />
      <LayoutView
        title={diNo}
        loading={loading}
        data={trips}
        viewFields={fields}
        handleBack={handleBack}
        handleDeleteAgree={handleDeleteAgree}
        handleAddButton={handleAddButton}
        handleEditButton={handleEditButton}
        numSelected={selected}
        print
        className={styles.viewDiv}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
  };
};

export default withRouter(
  connect(mapStateToProps, { getTrips, deleteTrips })(ViewTrip)
);
