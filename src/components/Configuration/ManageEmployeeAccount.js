import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

import CustomLoader from "../CustomComponents/CustomLoader/CustomLoader";
import {
  editAccount,
  addAccount,
  getAccount,
  deleteAccount,
} from "../../containers/Accounts/action";
import AddEmployeeAccount from "./AddEmployeeAccount";
import CustomDialog from "../CustomComponents/CustomDialog/CustomDialog";

const ManageEmployeeAccount = (props) => {
  const [state, setState] = useState("Manage");
  const [accountData, setAccounData] = useState(null);
  const [dialog, setDialog] = useState(false);
  let { accounts, loading, deleteLoading } = props.accounts;
  if (!accounts || !Array.isArray(accounts)) accounts = [];
  const { getAccount } = props;

  useEffect(() => {
    if (state === "Manage") getAccount();
  }, [state, getAccount]);

  const handleClick = (data) => {
    setAccounData(data);
    setState("Add");
  };

  const handleDeleteIcon = (row) => {
    setAccounData(row);
    setDialog(true);
  };

  const handleAgree = () => {
    props.deleteAccount([accountData._id], props.getAccount);
  };

  const AddAccountIcon = () => {
    return (
      <Box textAlign="right" paddingRight="3%">
        <Button onClick={() => setState("Add")}>
          <span style={{ fontSize: "1.5rem" }}>+</span>Add Account
        </Button>
      </Box>
    );
  };

  if (loading || deleteLoading) return <CustomLoader />;
  else if (state === "Add") {
    return (
      <AddEmployeeAccount
        setState={setState}
        initialFields={accountData}
        setAccountData={setAccounData}
      />
    );
  } else if (!loading && accounts.length === 0)
    return (
      <Box textAlign="center" padding="0" fontWeight="500">
        <AddAccountIcon />
        No Accounts found
      </Box>
    );
  else
    return (
      <React.Fragment>
        <CustomDialog
          open={dialog}
          setOpen={setDialog}
          handleAgree={handleAgree}
        />
        <AddAccountIcon />
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
                    onClick={() => handleClick(row)}
                  >
                    {row.userName}
                  </TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteIcon(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
};

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  editAccount,
  addAccount,
  getAccount,
  deleteAccount,
})(ManageEmployeeAccount);
