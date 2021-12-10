import { connect } from "react-redux";

const Driver = () => {
  return <h1>This Is Driver Page</h1>;
};

const mapStateToProps = (state) => {
  return {
    driverExpense: state.driverExpense,
    user: state.user,
  };
};

export default connect(mapStateToProps)(Driver);
