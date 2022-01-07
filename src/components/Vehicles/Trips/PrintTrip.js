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

  // const rules = [
  //   `a) I / We here by decalre that I/We have not taken the credit of Excise Duty Paid on inputs or capital goods or Service tax Credit on input services, used for providing the "Transport of Goods by Road" Service under the provision of Cenvat Credit Rules 2004.`,
  //   `b) I/We hereby declare that We have not availed the benefit under norificotion of the Government of India in the Ministry of finance Department of Revenue No. 12/2003 Service Tax, dated the 20th June 2003 (G.S.R. 503(E) dated the 20th June 2003).`,
  //   `c) I/We also agree to indemnify the company against any payment / liability lossof cridit/ damage caused to the company in case of our default for company with the said declaration.`,
  // ];

  const location = trips.addedBy.location.split(",");
  if (!location[1]) location[1] = "";

  return (
    <div className={styles.printDiv}>
      <Grid container>
        <Grid item style={{ textAlign: "center", width: "70%" }}>
          <h1 style={{ fontSize: "3rem" }}>
            <img
              src="https://www.clipartmax.com/png/small/18-189224_big-image-swastik-logo-black-white.png"
              height="50px"
              width="auto"
              style={{ marginRight: "10px", marginBottom: "10px" }}
              alt="Swastik Logo"
            />
            M/S.{" "}
            {user.companyName
              ? user.companyName.toUpperCase()
              : user.companyAdminId.companyName
              ? user.companyAdminId.companyName.toUpperCase()
              : "SWASTIK MINERALS"}
          </h1>
          <h5>FLEET OWNERS AND TRANSPORT CONTRACTOR</h5>
          <h5>Authorised Transport Contractor</h5>
          <h5>GOOD CONSIGNMENT NOTE</h5>
        </Grid>
        <Grid item style={{ textAlign: "center", width: "30%" }}>
          <Box borderRadius="10px" className={styles.border} padding="5px">
            <h5>(Mob) 9977115338, 7415844010</h5>
            <h5>H.O : Gandhi Chowk, Neora</h5>
            <h5>Distt. Raipur (C.G)</h5>
          </Box>
          <h5 style={{ marginTop: "10px" }}>
            T.P.T Code:{" "}
            {user.tptCode ? user.tptCode : user.companyAdminId.tptCode}
          </h5>
        </Grid>
      </Grid>
      <br />
      <Grid container>
        <Grid item style={{ width: "25%" }}>
          <h5>Branch: {location[1].toUpperCase()}</h5>
        </Grid>
        <Grid style={{ width: "25%" }}>
          <h5>LR No. : {trips.lrNo}</h5>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          className={styles.border}
          style={{ padding: "10px", width: "50%" }}
        >
          <h5>Consignor : {location[0].toUpperCase()} LTD.</h5>
          <h5>Form : {location[1].toUpperCase()}</h5>
        </Grid>
        <Grid
          item
          style={{ padding: "10px", width: "50%" }}
          className={`${styles.borderRight} ${styles.borderTop} ${styles.borderBottom}`}
        >
          <h5>Consignee</h5>
          <Grid container spacing={3}>
            <Grid item style={{ width: "50%" }}>
              <h5 style={{ height: "100%" }}>To: {trips.partyName}</h5>
            </Grid>
            <Grid item style={{ width: "50%" }}>
              <h5>Date: {formatDateInDDMMYYY(trips.date)}</h5>
            </Grid>
            <Grid item style={{ width: "50%", paddingTop: 0 }}>
              <h5>Location: {trips.location}</h5>
            </Grid>
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
            <h5>PSC/PPC</h5>
            <h5>Cement Bags : {trips.quantity * 20}</h5>
          </Box>
          <Box className={styles.borderRight} height="67%" padding="20px 5px">
            <h5>Party Phone No. : </h5>
            <h5>Driver Name : {trips.driverName}</h5>
            <h5>Driver Phone No. : {trips.driverPhone}</h5>
          </Box>
        </Grid>
        <Grid container item md={6} sm={6} style={{ width: "50%" }}>
          <Grid item style={{ width: "20%" }}>
            <h5 className={styles.borderBottom} style={{ padding: "10px" }}>
              Qty
            </h5>
            <h5 style={{ marginTop: "30px", textAlign: "center" }}>
              {trips.quantity}
            </h5>
          </Grid>
          <Grid item style={{ width: "80%" }} className={styles.borderLeft}>
            <h5
              style={{ textAlign: "center", padding: "10px" }}
              className={styles.borderBottom}
            >
              Remarks
            </h5>
            <Box style={{ padding: "5px" }}>
              <h5>Truck No. : {trips.vehicleNo}</h5>
              <h5>Gate Pass No.</h5>
              <h5>Date : {formatDateInDDMMYYY(trips.date)}</h5>
              <h5>D.I NO. : {trips.diNo}</h5>
              <h5>Adv. Amount : {trips.cash}</h5>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Box marginTop="10px">
        {/* {rules.map((rule, index) => {
          return (
            <h4 key={index} className={styles.rules}>
              {rule}
            </h4>
          );
        })}
        <h4 className={styles.rules}>
          We here by under take that we have into availed the credit on the duty
          paid on input annd caprtal goods used for providing such taxble
          service and have also not availed benefit under notification no
          12/2003 dated 20/08/2003
        </h4> */}
        <h3
          style={{ textAlign: "end", marginRight: "10px", marginTop: "7rem" }}
        >
          For, Swastik Minerals
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
