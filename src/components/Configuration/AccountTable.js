import React from "react"
import { connect } from "react-redux"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { includesInArray } from "../../utils/constants"

const AccountTable = (props) => {
  let { accounts } = props.accounts
  if (!accounts || !Array.isArray(accounts)) accounts = []

  accounts = accounts.filter((val) => {
    const searchIn = [
      val.userName,
      val.location,
      val.tptCode ? val.tptCode : "",
      val.companyName ? val.companyName : "",
    ]
    return includesInArray(searchIn, props.search)
  })

  return (
    <TableContainer
      component={Paper}
      style={{ marginRight: "3%", width: "95%" }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "600" }}>User Name</TableCell>
            <TableCell style={{ fontWeight: "600" }}>Location</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((row, index) => (
            <TableRow key={index}>
              <TableCell
                style={{
                  color: "blue",
                  cursor: "pointer",
                  "&:hover": { color: "yellow" },
                }}
                onClick={() => props.handleClick(row)}
              >
                {row.userName}
              </TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>
                <Tooltip title="Delete">
                  <IconButton onClick={() => props.handleDeleteIcon(row)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    user: state.user,
  }
}

export default connect(mapStateToProps)(AccountTable)
