import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

import CustomLoader from "../CustomComponents/CustomLoader/CustomLoader"
import {
  editAccount,
  addAccount,
  getAccount,
  deleteAccount,
} from "../../containers/Accounts/action"
import AddEmployeeAccount from "./AddEmployeeAccount"
import CustomDialog from "../CustomComponents/CustomDialog/CustomDialog"
import AccountTable from "./AccountTable"

const ManageEmployeeAccount = (props) => {
  const [state, setState] = useState("Manage")
  const [search, setSearch] = useState("")
  const [accountData, setAccounData] = useState(null)
  const [dialog, setDialog] = useState(false)
  
  let { accounts, loading, deleteLoading } = props.accounts
  if (!accounts || !Array.isArray(accounts)) accounts = []
  const { getAccount } = props

  useEffect(() => {
    if (state === "Manage") getAccount()
  }, [state, getAccount])

  const handleClick = (data) => {
    setAccounData(data)
    setState("Add")
  }

  const handleDeleteIcon = (row) => {
    setAccounData(row)
    setDialog(true)
  }

  const handleAgree = () => {
    const cb = () => {
      props.getAccount()
      setAccounData(null)
    }
    props.deleteAccount([accountData._id], cb)
  }

  const AddAccountIcon = () => {
    return (
      <Box textAlign="right" paddingRight="3%">
        <Button onClick={() => setState("Add")}>
          <span style={{ fontSize: "1.5rem" }}>+</span>Add Account
        </Button>
      </Box>
    )
  }

  if (loading || deleteLoading) return <CustomLoader />
  else if (state === "Add") {
    return (
      <AddEmployeeAccount
        setState={setState}
        initialFields={accountData}
        setAccountData={setAccounData}
      />
    )
  } else if (!loading && accounts.length === 0)
    return (
      <Box textAlign="center" padding="0" fontWeight="500">
        <AddAccountIcon />
        No Accounts found
      </Box>
    )
  else
    return (
      <React.Fragment>
        <CustomDialog
          open={dialog}
          setOpen={setDialog}
          handleAgree={handleAgree}
        />
        <Box backgroundColor="white" marginRight="5%">
          <TextField
            id="searchAccount"
            variant="standard"
            style={{ width: "100%", padding: "0 10px 5px" }}
            value={search}
            type="text"
            onChange={(val) => {
              setSearch(val.target.value)
            }}
            placeholder="Search"
            name="search"
          />
        </Box>
        <AddAccountIcon />
        <AccountTable
          handleClick={handleClick}
          handleDeleteIcon={handleDeleteIcon}
          search={search}
        />
      </React.Fragment>
    )
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    user: state.user,
  }
}

export default connect(mapStateToProps, {
  editAccount,
  addAccount,
  getAccount,
  deleteAccount,
})(ManageEmployeeAccount)
