import React, { useState, lazy } from "react"
import { connect } from "react-redux"
import "./styles.scss"
import "./bootstap.scss"
import { ProSidebar } from "react-pro-sidebar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { withRouter } from "react-router"
import SideHeader from "./SideHeader"
import SideFooter from "./SideFooter"
import SideContent from "./SideContent"
import { userLogout } from "../../containers/Login/action"

import { OfflineFooter } from "../Footer/Footer"
import useNetworkStatus from "../CustomComponents/CustomHooks/useNetworkStatus"

const Header = lazy(() => import("../Header/Header"))
const Route = lazy(() => import("../Routes/Route"))

const Navigation = (props) => {
  const [toggled, setToggled] = useState(false)
  const isOnline = useNetworkStatus()
  let user = props.user.user

  if (!user) user = {}

  const handleToggleSidebar = () => {
    setToggled(!toggled)
  }

  return (
    <div className={`app ${toggled ? "toggled" : ""}`}>
      <ProSidebar
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
        className="noPrint"
      >
        <SideHeader />
        <SideContent handleToggleSidebar={handleToggleSidebar} />
        <SideFooter />
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
              aria-label="Menu"
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
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default withRouter(connect(mapStateToProps, { userLogout })(Navigation))
