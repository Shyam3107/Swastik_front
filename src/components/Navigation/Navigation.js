import React, { useState, lazy } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./styles.scss";
import ReceiptIcon from "@mui/icons-material/Receipt";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SubMenu,
} from "react-pro-sidebar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
//import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BusinessIcon from "@mui/icons-material/Business";
import { BiTrip } from "react-icons/bi";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { ROUTES } from "../../utils/constants";
import Footer, { OfflineFooter } from "../Footer/Footer";
import useNetworkStatus from "../CustomComponents/CustomHooks/useNetworkStatus";

const Header = lazy(() => import("../Header/Header"));
const Route = lazy(() => import("../Routes/Route"));

const Navigation = (props) => {
  const [toggled, setToggled] = useState(false);
  const isOnline = useNetworkStatus();

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const menuItems = [
    {
      icon: <HomeIcon />,
      title: "Home",
      link: ROUTES.HOME,
    },
    {
      icon: <DirectionsBusIcon />,
      title: "Vehicles",
      subMenu: [
        {
          title: "Documents",
          link: ROUTES.DOCUMENTS,
          icon: <ReceiptIcon />,
        },
        {
          title: "Trips",
          link: ROUTES.TRIPS,
          icon: <BiTrip style={{ fontSize: "28px" }} />,
        },
      ],
    },
    {
      icon: <AccountBalanceWalletIcon />,
      title: "Expenses",
      subMenu: [
        {
          title: "Office",
          link: ROUTES.OFFICE_EXPENSE,
          icon: <BusinessIcon />,
        },
        // {
        //   title: "Driver",
        //   link: ROUTES.DRIVER_EXPENSE,
        //   icon: <PersonIcon />,
        // },
        {
          title: "Vehicles",
          link: ROUTES.VEHICLES_EXPENSE,
          icon: <DirectionsBusIcon />,
        },
      ],
    },
  ];

  return (
    <div className={`app ${toggled ? "toggled" : ""}`}>
      <ProSidebar
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader className="sideBarHeader">
          <div className="sideBarHeaderImg">
            <img
              src={process.env.PUBLIC_URL + "/images/Swastik Logo.png"}
              className="logoImg"
              alt="logo"
            />
          </div>
          <div className="sideBarHeaderName">Swastik minerals</div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            {menuItems.map((item, index) => {
              if (item.subMenu) {
                return (
                  <SubMenu
                    title={item.title}
                    icon={item.icon}
                    key={index}
                    active={item.active}
                  >
                    {item.subMenu.map((sub, ind) => {
                      return (
                        <MenuItem key={ind} icon={sub.icon}>
                          <Link to={sub.link}>{sub.title}</Link>
                        </MenuItem>
                      );
                    })}
                  </SubMenu>
                );
              } else
                return (
                  <MenuItem icon={item.icon} key={index} active={item.active}>
                    <Link to={item.link}>{item.title}</Link>
                  </MenuItem>
                );
            })}
          </Menu>
        </SidebarContent>
        <SidebarFooter className="sideBarFooter">
          <Menu iconShape="circle">
            <MenuItem icon={<LogoutIcon />}>
              <Link to={ROUTES.LOGOUT}>Logout</Link>
            </MenuItem>
            <Footer />
          </Menu>
        </SidebarFooter>
      </ProSidebar>

      <div
        style={{ width: "100%", overflowX: "auto", backgroundColor: "#F6F6F7" }}
      >
        <Header
          MenuIcon={
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              className="btn-toggle"
              onClick={handleToggleSidebar}
            >
              <MenuIcon />
            </IconButton>
          }
        />

        <Box
          sx={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
            paddingTop: "20px",
          }}
        >
          <Paper sx={{ width: "96%", mb: 2, paddingTop: "10px" }}>
            <Route />
          </Paper>
          {!isOnline && <OfflineFooter />}
        </Box>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Navigation);
