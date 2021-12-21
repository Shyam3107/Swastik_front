import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";

import { formatDate, ROUTES } from "../../../utils/constants";
import { getTrips, deleteTrips } from "../../../containers/Trips/action";
import LayoutView from "../../Layout/LayoutView";
import { header, headerKey, EDIT_URL } from "./constants";

const ViewTrip = (props) => {
  const history = useHistory();
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
    />
  );
};

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
  };
};

export default connect(mapStateToProps, { getTrips, deleteTrips })(ViewTrip);
