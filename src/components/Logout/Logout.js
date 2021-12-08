import { useHistory } from "react-router";
import { userLogout } from "../../containers/Login/action";
import { ROUTES } from "../../utils/constants";
import { connect } from "react-redux";

const Logout = (props) => {
  const history = useHistory();

  history.push(ROUTES.LOGIN);
  sessionStorage.clear();
  props.userLogout();

  return <div>This is logout function</div>;
};

export default connect(null, { userLogout })(Logout);
