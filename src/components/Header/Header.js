import { connect } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import { withRouter } from "react-router";

import { ROUTES } from "../../utils/constants";
import styles from "./styles.module.css";

const Header = (props) => {
  const history = props.history;
  const user = props.user.user;

  return (
    <header className={styles.header}>
      <AppBar position="static">
        <Toolbar>
          {props.MenuIcon}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Transport Management System
          </Typography>
          {user && !user.addedBy && (
            <Button
              color="inherit"
              onClick={() => history.push(ROUTES.CONFIGURATION)}
              cursor="pointer"
            >
              <SettingsIcon />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default withRouter(connect(mapStateToProps)(Header));
