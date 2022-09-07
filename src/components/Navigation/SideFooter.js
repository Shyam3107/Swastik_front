import React from "react"
import { connect } from "react-redux"
import "./styles.scss"
import "./bootstap.scss"
import { Menu, MenuItem, SidebarFooter } from "react-pro-sidebar"
import LogoutIcon from "@mui/icons-material/Logout"
import { withRouter } from "react-router"

import { userLogout } from "../../containers/Login/action"
import { ROUTES } from "../../utils/constants"
import Footer from "../Footer/Footer"

const SideFooter = (props) => {
  const history = props.history

  const handleLogout = () => {
    history.push(ROUTES.LOGIN)
    sessionStorage.clear()
    props.userLogout()
  }

  return (
    <SidebarFooter className="sideBarFooter">
      <Menu iconShape="circle">
        <MenuItem
          icon={<LogoutIcon />}
          onClick={handleLogout}
          style={{ paddingLeft: "30px" }}
        >
          Logout
        </MenuItem>
        <MenuItem>
          <Footer />
        </MenuItem>
      </Menu>
    </SidebarFooter>
  )
}

const mapStateToProps = (state) => {
  return {}
}

export default withRouter(connect(mapStateToProps, { userLogout })(SideFooter))
