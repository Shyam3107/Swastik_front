import React from "react"
import { connect } from "react-redux"
import Grid from "@mui/material/Grid"

import styles from "./styles.module.css"
import { formatDateInDDMMYYY } from "../../../utils/constants"

const blackBorder = "1px solid black"

const PrintVoucher = (props) => {
  let { vouchers } = props.vouchers

  let amount = [
    {
      title: "Cash",
      value: vouchers?.cash,
    },
    {
      title: "Diesel",
      value: vouchers?.diesel,
    },
    {
      title: "TDS (%)",
      value: vouchers?.tds,
    },
    {
      title: "Shortage",
      value: vouchers?.shortage,
    },
    {
      title: "Other",
      value: vouchers?.other,
    },
    {
      title: "Total",
      value: vouchers?.total,
    },
  ]

  let fields = [
    {
      title: "DI No.",
      value: vouchers?.diNo,
    },
    {
      title: "Designation",
      value: vouchers?.designation,
    },
    {
      title: "LR No.",
      value: vouchers?.lrNo,
    },
    // {
    //   title: "Billing Rate",
    //   value: vouchers?.billingRate,
    // },
    {
      title: "Rate",
      value: vouchers?.rate,
      //width: "33%",
    },
    {
      title: "Quantity(MT)",
      value: vouchers?.quantity,
      //width: "33%",
    },
    {
      title: "Amount",
      value: vouchers?.quantity * vouchers?.rate,
      //width: "33%",
    },
    {
      title: "DI Date",
      value: formatDateInDDMMYYY(vouchers?.date),
    },
    {
      title: "Truck No.",
      value: vouchers?.vehicleNo,
    },
    {
      title: "Paid To",
      value: vouchers?.paidTo,
      width: "100%",
    },
    {
      title: "Account No.",
      value: vouchers?.accountNo,
    },
    {
      title: "IFSC",
      value: vouchers?.ifsc,
    },
    {
      title: "Remarks",
      value: vouchers?.remarks,
      width: "100%",
    },
  ]

  return (
    <div className={styles.printDiv}>
      <h2 style={{ textAlign: "center" }}>Voucher</h2>
      <Grid
        container
        style={{ borderBottom: blackBorder, marginBottom: "3px" }}
      >
        <Grid item style={{ width: "80%" }}>
          <h2>JAGDISH PRASAD SINGHANIA</h2>
          <h3>Pro. Swastik Minerals &amp; Govinda Roadlines</h3>
        </Grid>
        <Grid item style={{ width: "20%", fontSize: "1.5rem" }}>
          <p>Site: {vouchers?.site}</p>
          <p>Date: {formatDateInDDMMYYY(vouchers?.date)}</p>
        </Grid>
        <h3 style={{ paddingBottom: "5px" }}>
          Near Tirupati Balaji Foods, Vill. Kohka, P.O. Neora, Distt.
          Raipur(C.G) 493114
        </h3>
      </Grid>
      <Grid container>
        <Grid
          item
          style={{
            width: "75%",
            display: "flex",
            border: blackBorder,
            marginRight: "10px",
            flexWrap: "wrap",
            fontSize: "1.5rem",
          }}
        >
          {fields.map((val, index) => {
            return (
              <p
                style={{
                  width: val?.width ?? "50%",
                  borderBottom:
                    index !== fields.length - 1 ? blackBorder : null,
                  padding: "1px 10px",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                }}
                key={val.title}
              >
                {val.title} : {val.value}
              </p>
            )
          })}
        </Grid>
        <Grid
          item
          style={{ width: "24%", border: blackBorder, padding: "5px" }}
        >
          <h3 style={{ textAlign: "center" }}>Amount</h3>
          <table style={{ width: "100%", border: blackBorder }}>
            {amount.map((am) => {
              return (
                <tbody key={am.title}>
                  <tr style={{ border: blackBorder, fontSize: "1.5rem" }}>
                    <td style={{ border: blackBorder, paddingLeft: "5px" }}>
                      {am.title}
                    </td>
                    <td style={{ paddingLeft: "5px" }}> {am.value}</td>
                  </tr>
                </tbody>
              )
            })}
          </table>
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "5rem 1rem 0",
          fontSize: "1.5rem",
        }}
      >
        <p>Sender</p>
        <p>Receiver</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    vouchers: state.vouchers,
  }
}

export default connect(mapStateToProps)(PrintVoucher)
