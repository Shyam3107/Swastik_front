import React from "react"
import { connect } from "react-redux"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import styles from "./styles.module.css"
import { formatDateInDDMMYYY } from "../../../utils/constants"

const PrintTrip = (props) => {
  let { trips } = props.trips
  let user = props.user.user
  if (!trips || Array.isArray(trips)) trips = { addedBy: { location: "" } }

  // const rules = [
  //   `a) I / We here by decalre that I/We have not taken the credit of Excise Duty Paid on inputs or capital goods or Service tax Credit on input services, used for providing the "Transport of Goods by Road" Service under the provision of Cenvat Credit Rules 2004.`,
  //   `b) I/We hereby declare that We have not availed the benefit under norificotion of the Government of India in the Ministry of finance Department of Revenue No. 12/2003 Service Tax, dated the 20th June 2003 (G.S.R. 503(E) dated the 20th June 2003).`,
  //   `c) I/We also agree to indemnify the company against any payment / liability lossof cridit/ damage caused to the company in case of our default for company with the said declaration.`,
  // ];

  let consignor = trips.addedBy?.consignor
  let branch = trips.addedBy?.branch

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
            M/S.{" "}
            {user?.companyName?.toUpperCase() ??
              user?.companyAdminId?.companyName?.toUpperCase() ??
              "SWASTIK MINERALS"}
          </h1>
          <h3>FLEET OWNERS AND TRANSPORT CONTRACTOR</h3>
          <h3>Authorised Transport Contractor</h3>
          <h3>GOOD CONSIGNMENT NOTE</h3>
        </Grid>
        <Grid item style={{ textAlign: "center", width: "40%" }}>
          <Box borderRadius="10px" className={styles.border} padding="5px">
            <h3>
              (Mob) 7415844010, 9977115338 {user.phone ? `, ${user.phone}` : ""}
            </h3>
            <h3>H.O : Gandhi Chowk, Neora</h3>
            <h3>Distt. Raipur (C.G)</h3>
          </Box>
          <h3 style={{ marginTop: "15px" }}>
            T.P.T Code:{" "}
            {user.tptCode ? user.tptCode : user.companyAdminId.tptCode}
          </h3>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item style={{ width: "25%" }}>
          <h5>Branch: {branch ? branch : ""}</h5>
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
          <h5>Consignor : {consignor ? consignor + " LTD." : ""}</h5>
          <h5>Form : {branch ? branch : ""}</h5>
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
            <h5>Material : {trips.material}</h5>
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
              Qty (MT)
            </h5>
            <h4 style={{ marginTop: "30px", textAlign: "center" }}>
              {trips.quantity}
            </h4>
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
          For,{" "}
          {user.companyName
            ? user.companyName
            : user.companyAdminId.companyName
            ? user.companyAdminId.companyName
            : "SWASTIK MINERALS"}
        </h3>
      </Box>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
    user: state.user,
  }
}

export default connect(mapStateToProps)(PrintTrip)
