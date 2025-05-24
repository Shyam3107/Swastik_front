import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { getDrivers } from "../../containers/Drivers/action";
import AddDriver from "./AddDriver";

const Driver = (props) => {
  let { drivers } = props.drivers;
  const params = useParams();
  const { getDrivers } = props;
  const { driverId } = params;

  useEffect(() => {
    getDrivers({ driverId });
  }, [driverId, getDrivers]);

  if (drivers && Array.isArray(drivers)) drivers = null;

  return <AddDriver initialFields={drivers} />;
};

const mapStateToProps = (state) => {
  return {
    drivers: state.drivers,
  };
};

export default connect(mapStateToProps, { getDrivers })(Driver);
