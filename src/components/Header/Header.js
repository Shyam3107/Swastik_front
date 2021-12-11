import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import { useHistory } from "react-router";

import { ROUTES } from "../../utils/constants";

const Header = ({ MenuIcon }) => {
  const history = useHistory();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {MenuIcon}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Transport Managing System
          </Typography>
          <Button
            color="inherit"
            onClick={() => history.push(ROUTES.CONFIGURATION)}
            cursor="pointer"
          >
            <SettingsIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
