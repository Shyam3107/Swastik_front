import { useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import PieChart from "../CustomComponents/CustomCharts/PieChart/PieChart";
import BarChart from "../CustomComponents/CustomCharts/BarChart/BarChart";
import CustomLoader from "../CustomComponents/CustomLoader/CustomLoader";
import { getHome } from "../../containers/Home/action";
import { tripsMonth, vehicleStatus } from "./constants";

const Home = (props) => {
  let { home, loading } = props.home;
  const getHome = props.getHome;
  if (!home) home = { tax: [], insurance: [], fitness: [], trips: [] };

  useEffect(() => {
    getHome();
  }, [getHome]);

  const pieCharts = [
    {
      data: home.tax,
      labels: vehicleStatus,
      title: "Tax",
    },
    {
      data: home.fitness,
      labels: vehicleStatus,
      title: "Fitness",
    },
    {
      data: home.insurance,
      labels: vehicleStatus,
      title: "Insurance",
    },
  ];

  const showBarChart = !home.trips.every((val) => !val);

  return (
    <Box margin="20px">
      <Grid container spacing={4} marginBottom="20px">
        {pieCharts.map((chart, index) => {
          const showChart = !chart.data.every((val) => !val);
          return (
            <Grid item key={index} lg={4} md={6} sm={12}>
              <Paper
                elevation={10}
                style={{
                  padding: "10px",
                  backgroundColor: "#C5E9EA",
                }}
              >
                <h5 style={{ textAlign: "center" }}>{chart.title}</h5>
                {loading && <CustomLoader />}
                {!loading && !showChart && (
                  <Box textAlign="center">No Vehicles Found</Box>
                )}
                {!loading && showChart && (
                  <PieChart
                    data={chart.data}
                    labels={chart.labels}
                    height="250px"
                    width="100%"
                  />
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Box>
        {loading && <CustomLoader />}
        {/* {!loading && showBarChart && (
          <Box textAlign="center" marginTop="20px">
            No Trips Found
          </Box>
        )} */}
        {!loading && showBarChart && (
          <Grid container>
            <Grid item lg={12} md={12} sm={12}>
              <BarChart
                labels={tripsMonth}
                data={home.trips}
                title="Trips"
                subTitle="Month Wise"
                width="97%"
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    home: state.home,
    user: state.user,
  };
};

export default withRouter(connect(mapStateToProps, { getHome })(Home));

// add vehicle fitness status
// tax status
// insurance status

// per month trip
