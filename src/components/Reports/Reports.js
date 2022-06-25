import React, { useState } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import Box from "@mui/material/Box"
import moment from "moment"

import { getVehiclesReport } from "../../containers/Reports/action"
import Layout from "../Layout/Layout"
import { monthStart, currentDate } from "../../utils/constants"

const Reports = (props) => {
  const [from, setFrom] = useState(monthStart)
  const [to, setTo] = useState(currentDate)
  const { loading } = props.reports

  const handleClick = () => {
    props.getVehiclesReport({
      from: moment(from).toISOString(),
      to: moment(to).toISOString(),
    })
  }

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
        <Box
          margin="2%"
          color="blue"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          Click here to Download Vehicle Report
        </Box>
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
  connect(mapStateToProps, { getVehiclesReport })(Reports)
)
