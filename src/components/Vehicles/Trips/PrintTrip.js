import React from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import styles from "./styles.module.css";
import { formatDateInDDMMYYY } from "../../../utils/constants";

const PrintTrip = (props) => {
  let { trips } = props.trips;
  let user = props.user.user;
  if (!trips || Array.isArray(trips)) trips = { addedBy: { location: "" } };

  let consignor = trips.addedBy?.consignor;
  let branch = trips.addedBy?.branch;

  const companyName =
    user?.companyName ??
    user?.companyAdminId?.companyName ??
    "SWASTIK MINERALS";

  if (!trips?.diesel) {
    trips.diesel = 0;
  }

  if (!trips?.cash) {
    trips.cash = 0;
  }

  return (
    <div className={styles.printDiv}>
      <Grid container>
        <Grid item style={{ textAlign: "center", width: "60%" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "700" }}>
            <img
              src={process.env.PUBLIC_URL + "/images/Swastik Logo.png"}
              height="50px"
              width="auto"
              style={{ marginRight: "20px", marginBottom: "10px" }}
              alt="Swastik Logo"
            />
            M/S. {companyName.toUpperCase()}
          </h1>
          <h3>FLEET OWNERS AND TRANSPORT CONTRACTOR</h3>
          <h3>Authorised Transport Contractor</h3>
          <h3>GOOD CONSIGNMENT NOTE</h3>
        </Grid>
        <Grid item style={{ textAlign: "center", width: "40%" }}>
          <Box borderRadius="10px" className={styles.border} padding="5px">
            <h3>
              (Mob) {/* User Phone else Admin Phone */}
              {trips?.addedBy?.phone ?? user?.companyAdminId?.phone} {", "}
              {/* User Phone 2 else Admin Phone 2 */}
              {trips?.addedBy?.phone2 ?? user?.companyAdminId?.phone2} {", "}
              9977115338
            </h3>
            <h3>Singhania Office, Kohka, Tilda</h3>
            <h3>Distt. Raipur (C.G)</h3>
          </Box>
          <h3 style={{ marginTop: "15px" }}>
            T.P.T Code:{" "}
            {trips?.addedBy?.tptCode ?? user?.companyAdminId?.tptCode ?? ""}
          </h3>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item style={{ width: "25%" }}>
          <h4>Branch: {branch ? branch : ""}</h4>
        </Grid>
        <Grid style={{ width: "25%" }}>
          <h4>LR No. : {trips.lrNo}</h4>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          className={styles.border}
          style={{ padding: "10px", width: "50%" }}
        >
          <h4>Consignor : {consignor ? consignor + " LTD." : ""}</h4>
          <h4>From : {branch ? branch : ""}</h4>
        </Grid>
        <Grid
          item
          style={{ padding: "10px", width: "50%" }}
          className={`${styles.borderRight} ${styles.borderTop} ${styles.borderBottom}`}
        >
          <h4>Consignee</h4>
          <Grid container spacing={3}>
            <Grid item style={{ width: "50%" }}>
              <h4 style={{ height: "100%" }}>To: {trips.partyName}</h4>
            </Grid>
            <Grid item style={{ width: "50%" }}>
              <h4>Date: {formatDateInDDMMYYY(trips.date)}</h4>
            </Grid>
            <Grid item style={{ width: "50%", paddingTop: 0 }}>
              <h4>Location: {trips.location}</h4>
            </Grid>
            {trips?.partyName2 && (
              <Grid item style={{ width: "50%", paddingTop: 0 }}>
                <h4>Party Name: {trips.partyName2}</h4>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Box
        className={`${styles.borderRight} ${styles.borderLeft}`}
        fontSize="1.6rem"
        padding="5px"
        textAlign="center"
        fontWeight="600"
      >
        ON BROKERS &#38; TRUCK OWNERS RISK &#38; RESPONSIBILITY
      </Box>
      <Grid container className={styles.border}>
        <Grid item md={6} sm={6} style={{ width: "50%" }}>
          <Box
            className={`${styles.borderRight} ${styles.borderBottom}`}
            padding="5px"
          >
            <h4>PSC/PPC</h4>
            <h4>Material : {trips.material}</h4>
            <h4>Bags : {trips.bags}</h4>
          </Box>
          <Box className={styles.borderRight} height="67%" padding="20px 5px">
            <h4>Driver Name : {trips.driverName}</h4>
            <h4>Driver Phone No. : {trips.driverPhone}</h4>
          </Box>
        </Grid>
        <Grid container item md={6} sm={6} style={{ width: "50%" }}>
          <Grid item style={{ width: "20%" }}>
            <h5 className={styles.borderBottom} style={{ padding: "10px" }}>
              Qty (MT)
            </h5>
            <h4 style={{ marginTop: "30px", textAlign: "center" }}>
              {trips.quantity}
            </h4>
          </Grid>
          <Grid item style={{ width: "80%" }} className={styles.borderLeft}>
            <h4
              style={{ textAlign: "center", padding: "10px" }}
              className={styles.borderBottom}
            >
              Remarks
            </h4>
            <Box style={{ padding: "5px" }}>
              <h4>Vehicle No. : {trips.vehicleNo}</h4>
              <h4>Date : {formatDateInDDMMYYY(trips.date)}</h4>
              <h4>D.I No. : {trips.diNo}</h4>
              <h4>
                Amount : {trips?.cash === 0 ? 0 : trips.cash?.toFixed(0) + "/-"}
              </h4>
              <h4>
                Diesel :{" "}
                {trips?.diesel === 0
                  ? 0
                  : trips.diesel?.toFixed(2) +
                    (trips.dieselIn === "Litre" ? " Ltr" : "/-")}
              </h4>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Box marginTop="10px">
        <h4>
          1. We hereby declare that input tax credit of capital goods and input
          services used for providing transportation service has not been taken
          by us.
        </h4>
        <h3
          style={{ textAlign: "end", marginRight: "10px", marginTop: "6rem" }}
        >
          For, {companyName}
        </h3>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
    user: state.user,
  };
};

export default connect(mapStateToProps)(PrintTrip);
