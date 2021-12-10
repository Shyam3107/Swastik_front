import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { getTrips } from "../../../containers/Trips/action";
import AddTrips from "./AddTrips";

const EditTrips = (props) => {
  let { trips } = props.trips;
  const params = useParams();
  const { getTrips } = props;
  const { diNo } = params;

  useEffect(() => {
    getTrips({ diNo });
  }, [diNo, getTrips]);

  if (trips && Array.isArray(trips)) trips = null;

  return <AddTrips initialFields={trips} />;
};

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
  };
};

export default connect(mapStateToProps, { getTrips })(EditTrips);
