import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Box from "@mui/material/Box";
import moment from "moment";
import { Link } from "react-router-dom";

import { getReports, downloadReports } from "../../containers/Reports/action";
import Layout from "../Layout/Layout";
import { monthStart, currentDate } from "../../utils/constants";
import { API } from "../../APIs/APIs";
import { VIEW_ALL_SITE_EXPENSE, VIEW_OWN_REPORT } from "./constants";
import { isAdmin } from "../../utils/utilities";

const Reports = (props) => {
  const [from, setFrom] = useState(monthStart);
  const [to, setTo] = useState(currentDate);
  const { downloadLoading } = props.reports;
  const user = props?.user?.user;

  const handleURLClick = (url) => {
    return () =>
      props.downloadReports({
        url,
        from: moment(from).toISOString(),
        to: moment(to).toISOString(),
      });
  };

  const fields = [
    {
      title: "View your Own Report",
      redirect: VIEW_OWN_REPORT(user._id),
    },
    {
      title: "View All Site Expense",
      redirect: VIEW_ALL_SITE_EXPENSE,
      display: isAdmin() ? "visible" : "none",
    },
    {
      title: "Vehicle",
      url: API.GET_VEHICLES_REPORTS,
    },
    {
      title: "Diesel By Pump", // NOT REQ
      url: API.GET_DIESELS_REPORTS,
    },
    {
      title: "Store Bills",
      url: API.GET_HARDWARE_SHOPS_REPORT,
    },
    {
      title: "All Vehicle Wise",
      url: API.DOWNLOAD_ALL_VEHICLE_WISE_REPORT,
      display: isAdmin() ? "visible" : "none",
    },
    {
      title: "Vehicle Diesels", // NOT REQ
      url: API.GET_VEHICLES_DIESELS_REPORT,
    },
    {
      title: "All Sites Wise Rokar", // NOT REQ
      url: API.DOWNLOAD_ALL_SITES_ROKAR,
    },
  ];

  return (
    <React.Fragment>
      <Layout
        title="Reports"
        loading={downloadLoading}
        selectedFrom={from}
        selectedTo={to}
        setSelectedFrom={setFrom}
        setSelectedTo={setTo}
      >
        {fields.map((val) => {
          // If Want to redirect to another page
          if (val.redirect) {
            return (
              <Link to={val.redirect} key={val.title}>
                <Box
                  margin="2%"
                  color="blue"
                  style={{
                    cursor: "pointer",
                    display: val.display ? val.display : "visible",
                  }}
                >
                  {val.title}
                </Box>
              </Link>
            );
          }

          // want to directly hit an API
          return (
            <Box
              key={val.title}
              margin="2%"
              color="blue"
              style={{ cursor: "pointer" }}
              onClick={handleURLClick(val.url)}
            >
              Click here to Download {val.title} Report
            </Box>
          );
        })}
      </Layout>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    reports: state.reports,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getReports,
    downloadReports,
  })(Reports)
);
