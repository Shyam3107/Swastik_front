import React, { useState } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import Box from "@mui/material/Box"
import moment from "moment"

import { getReports } from "../../containers/Reports/action"
import Layout from "../Layout/Layout"
import { monthStart, currentDate } from "../../utils/constants"
import { API } from "../../APIs/APIs"

const Reports = (props) => {
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(currentDate)
  const { loading } = props.reports

  const handleClick = (url) => {
    return () =>
      props.getReports({
        url,
        from: moment(from).toISOString(),
        to: moment(to).toISOString(),
      })
  }

  const fields = [
    {
      title: "Vehicle",
      url: API.GET_VEHICLES_REPORTS,
    },
    {
      title: "Diesel By Pump",
      url: API.GET_DIESELS_REPORTS,
    },
    {
      title: "Store Bills",
      url: API.GET_HARDWARE_SHOPS_REPORT,
    },
    {
      title: "Vehicle Diesels",
      url: API.GET_VEHICLES_DIESELS_REPORT,
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
              onClick={handleClick(val.url)}
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
    reports: state.reports,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getReports,
  })(Reports)
)
