import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import { ROUTES } from "../../utils/constants";
import Home from "../Home/Home";
import Trips from "../Trips/Trips";
import AddTrips from "../Trips/AddTrips";
import Documents from "../Documents/Documents";
import AddDocument from "../Documents/AddDocument";
import ViewDocument from "../Documents/ViewDocument";
import EditDocument from "../Documents/EditDocument";

const Routes = (props) => {
  const loggedIn = props.user.loggedIn;

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
            {rout.component}
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
