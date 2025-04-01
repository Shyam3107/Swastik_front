import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { getFleet } from "../../containers/Fleet/action";
import AddFleet from "./AddFleet";

const Fleet = (props) => {
  let { fleets } = props.fleets;
  const params = useParams();
  const { getFleet } = props;
  const { vehicleNo } = params;

  useEffect(() => {
    getFleet({ vehicleNo });
  }, [vehicleNo, getFleet]);

  if (fleets && Array.isArray(fleets)) fleets = null;

  return <AddFleet initialFields={fleets} />;
};

const mapStateToProps = (state) => {
  return {
    fleets: state.fleets,
  };
};

export default connect(mapStateToProps, { getFleet })(Fleet);
