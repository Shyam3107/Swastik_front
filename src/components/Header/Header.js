import { connect } from "react-redux"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import SettingsIcon from "@mui/icons-material/Settings"
import { withRouter } from "react-router"
import Tooltip from "@mui/material/Tooltip"

import { ROUTES } from "../../utils/constants"
import styles from "./styles.module.css"

const Header = (props) => {
  const history = props.history

  return (
    <header className={styles.header}>
      <AppBar position="static">
        <Toolbar>
          {props.MenuIcon}
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Transport Management System
          </Typography>
          <Tooltip title="Settings">
            <Button
              color="inherit"
              onClick={() => history.push(ROUTES.CONFIGURATION)}
              cursor="pointer"
              aria-label="Settings"
            >
              <SettingsIcon />
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </header>
  )
}

const mapStateToProps = (state) => {
  return {}
}

export default withRouter(connect(mapStateToProps)(Header))
