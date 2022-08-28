import React, { useState } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import Box from "@mui/material/Box"
import moment from "moment"

import {
  getVehiclesReport,
  getDieselsReport,
  getHardwareShopsReport,
} from "../../containers/Reports/action"
import Layout from "../Layout/Layout"
import { monthStart, currentDate } from "../../utils/constants"

const Reports = (props) => {
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(currentDate)
  const { loading } = props.reports

  const handleClick = (cb) => {
    return () =>
      cb({
        from: moment(from).toISOString(),
        to: moment(to).toISOString(),
      })
  }

  const fields = [
    {
      title: "Vehicle",
      onClick: props.getVehiclesReport,
    },
    {
      title: "Diesel",
      onClick: props.getDieselsReport,
    },
    {
      title: "Store Bills",
      onClick: props.getHardwareShopsReport,
    },
  ]

  return (
    <React.Fragment>
      <Layout
        title="Reports"
        loading={loading}
        selectedFrom={from}
        selectedTo={to}
        setSelectedFrom={setFrom}
        setSelectedTo={setTo}
      >
        {fields.map((val, index) => {
          return (
            <Box
              key={index}
              margin="2%"
              color="blue"
              style={{ cursor: "pointer" }}
              onClick={handleClick(val.onClick)}
            >
              Click here to Download {val.title} Report
            </Box>
          )
        })}
      </Layout>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    reports: state.reports,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getVehiclesReport,
    getDieselsReport,
    getHardwareShopsReport,
  })(Reports)
)
