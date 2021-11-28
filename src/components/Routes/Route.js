import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import { ROUTES } from "../../utils/constants";
import Tax from "../Tax/Tax";
import Home from "../Home/Home";
import Trips from "../Trips/Trips";
import AddTrips from "../Trips/AddTrips";

const Routes = (props) => {
  const loggedIn = true || props.user.loggedIn;

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
      path: ROUTES.TAX,
      component: <Tax />,
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
