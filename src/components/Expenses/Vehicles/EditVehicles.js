import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { getExpense } from "../../../containers/VehicleExpense/action";
import AddVehicles from "./AddVehicles";

const Vehicles = (props) => {
  let { expenses } = props.vehiclesExpense;
  const params = useParams();
  const { getExpense } = props;
  const { expenseId } = params;

  useEffect(() => {
    getExpense({ expenseId });
  }, [expenseId, getExpense]);

  if (expenses && Array.isArray(expenses)) expenses = null;

  return <AddVehicles initialFields={expenses} />;
};

const mapStateToProps = (state) => {
  return {
    vehiclesExpense: state.vehiclesExpense,
    user: state.user,
  };
};

export default connect(mapStateToProps, { getExpense })(Vehicles);
