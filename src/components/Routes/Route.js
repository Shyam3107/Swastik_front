import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import { ROUTES } from "../../utils/constants";
import Home from "../Home/Home";
import Trips from "../Vehicles/Trips/Trips";
import AddTrips from "../Vehicles/Trips/AddTrips";
import EditTrips from "../Vehicles/Trips/EditTrips";
import ViewTrip from "../Vehicles/Trips/ViewTrip";
import Documents from "../Vehicles/Documents/Documents";
import AddDocument from "../Vehicles/Documents/AddDocument";
import ViewDocument from "../Vehicles/Documents/ViewDocument";
import EditDocument from "../Vehicles/Documents/EditDocument";
import OfficeExpense from "../Expenses/Office/Office";
import AddOfficeExpense from "../Expenses/Office/AddOffice";
import EditOfficeExpense from "../Expenses/Office/EditOffice";
import VehiclesExpense from "../Expenses/Vehicles/Vehicles";
import AddVehiclesExpense from "../Expenses/Vehicles/AddVehicles";
import EditVehiclesExpense from "../Expenses/Vehicles/EditVehicles";
import Configuration from "../Configuration/Configuration";
import Receipt from "../Receipt/Receipt";
import AddReceipt from "../Receipt/AddReceipt";
import EditReceipt from "../Receipt/EditReceipt";

const Routes = (props) => {
  const loggedIn = props.user.loggedIn;
  const user = props.user.user;

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route {...rest}>
        {loggedIn ? children : <Redirect to={ROUTES.LOGIN} />}
      </Route>
    );
  };

  const privateRoutes = [
    {
      path: ROUTES.HOME,
      component: <Home />,
    },
    {
      path: ROUTES.LOGOUT,
      component: <Logout />,
    },
    {
      path: ROUTES.TRIPS,
      component: <Trips />,
    },
    {
      path: ROUTES.ADD_TRIP,
      component: <AddTrips />,
    },
    {
      path: ROUTES.EDIT_TRIP,
      component: <EditTrips />,
    },
    {
      path: ROUTES.VIEW_TRIP,
      component: <ViewTrip />,
    },
    {
      path: ROUTES.DOCUMENTS,
      component: <Documents />,
    },
    {
      path: ROUTES.ADD_DOCUMENT,
      component: <AddDocument />,
    },
    {
      path: ROUTES.VIEW_DOCUMENT,
      component: <ViewDocument />,
    },
    {
      path: ROUTES.EDIT_DOCUMENT,
      component: <EditDocument />,
    },
    {
      path: ROUTES.OFFICE_EXPENSE,
      component: <OfficeExpense />,
    },
    {
      path: ROUTES.OFFICE_EXPENSE,
      component: <OfficeExpense />,
    },
    {
      path: ROUTES.ADD_OFFICE_EXPENSE,
      component: <AddOfficeExpense />,
    },
    {
      path: ROUTES.EDIT_OFFICE_EXPENSE,
      component: <EditOfficeExpense />,
    },
    {
      path: ROUTES.VEHICLES_EXPENSE,
      component: <VehiclesExpense />,
    },
    {
      path: ROUTES.ADD_VEHICLES_EXPENSE,
      component: <AddVehiclesExpense />,
    },
    {
      path: ROUTES.EDIT_VEHICLES_EXPENSE,
      component: <EditVehiclesExpense />,
    },
    {
      path: ROUTES.RECEIPT,
      component: <Receipt />,
    },
    {
      path: ROUTES.EDIT_RECEIPT,
      component: <EditReceipt />,
    },
    {
      path: ROUTES.ADD_RECEIPT,
      component: <AddReceipt />,
    },
    {
      path: ROUTES.CONFIGURATION,
      component: <Configuration />,
      noShow: user && !user.addedBy ? false : true,
    },
  ];

  return (
    <Switch>
      <Route exact path="/">
        {loggedIn ? (
          <Redirect to={ROUTES.HOME} />
        ) : (
          <Redirect to={ROUTES.LOGIN} />
        )}
      </Route>
      <Route exact path={ROUTES.LOGIN}>
        {loggedIn ? <Redirect to={ROUTES.HOME} /> : <Login />}
      </Route>
      {privateRoutes.map((rout, index) => {
        return (
          <PrivateRoute exact path={rout.path} key={index}>
            {rout.noShow ? <Redirect to={ROUTES.HOME} /> : rout.component}
          </PrivateRoute>
        );
      })}
      <Route>
        <Redirect to={ROUTES.HOME} />
      </Route>
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Routes);
