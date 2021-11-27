import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

const Header = ({ MenuIcon }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>{MenuIcon}</Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
