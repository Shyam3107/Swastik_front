import React from "react"
import { connect } from "react-redux"
import "./styles.scss"
import "./bootstap.scss"
import { SidebarHeader } from "react-pro-sidebar"
import { withRouter } from "react-router"

const SideHeader = (props) => {
  let user = props.user.user

  if (!user) user = {}

  return (
    <SidebarHeader className="sideBarHeader">
      <div className="sideBarHeaderImg">
        <img
          src={process.env.PUBLIC_URL + "/images/Swastik Logo.png"}
          className="logoImg"
          alt="logo"
        />
      </div>
      <div className="sideBarHeaderName">
        {user.companyName
          ? user.companyName
          : user.companyAdminId.companyName
          ? user.companyAdminId.companyName
          : "Swastik Minerals"}
      </div>
    </SidebarHeader>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default withRouter(connect(mapStateToProps)(SideHeader))
