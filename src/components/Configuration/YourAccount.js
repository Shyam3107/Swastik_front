import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import FormHelperText from "@mui/material/FormHelperText"
import Button from "@mui/material/Button"

import useValidate from "../CustomComponents/CustomHooks/useValidate"
import { editAccount, getAccount } from "../../containers/Accounts/action"
import CustomLoader from "../CustomComponents/CustomLoader/CustomLoader"

const YourAccount = (props) => {
  let { accounts, loading, editLoading } = props.accounts
  if (!accounts || Array.isArray(accounts)) accounts = {}
  const user = props.user
  const accountId = user.user._id
  const [form, setForm] = useState(user.user)
  const [error, handleValidate] = useValidate()
  const { getAccount } = props

  useEffect(() => {
    getAccount({ accountId })
  }, [getAccount, accountId])

  useEffect(() => {
    if (accounts && accounts.userName) setForm(accounts)
  }, [accounts])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    handleValidate(e.target.name, e.target.value)
  }

  const handleSaveButton = () => {
    const cb = () => getAccount({ accountId })
    props.editAccount(form, cb)
  }

  if (loading || editLoading) return <CustomLoader />

  const inputFields = [
    { label: "User Name", id: "userName", required: true },
    { label: "Location", id: "location", required: true },
    { label: "Phone No.", id: "phone" },
    { label: "Company Name", id: "companyName" },
    { label: "T.P.T Code", id: "tptCode" },
  ]

  return (
    <Box>
      <Grid container style={{ width: "100%" }} spacing={4}>
        {inputFields.map((item, index) => {
          return (
            <Grid item xs={12} sm={5} md={4} lg={3} key={index}>
              <Typography variant="h6">
                {item.label}
                {item.required && <span style={{ color: "red" }}>*</span>}
              </Typography>
              <TextField
                id={item.id}
                variant="standard"
                style={{ width: "100%" }}
                value={form[item.id]}
                type="text"
                onChange={handleInputChange}
                name={item.id}
                error={Boolean(error[item.id])}
                onBlur={handleInputChange}
              />
              <FormHelperText error={Boolean(error[item.id])}>
                {error[item.id]}
              </FormHelperText>
            </Grid>
          )
        })}
      </Grid>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Button variant="contained" onClick={handleSaveButton}>
          Save
        </Button>
      </Box>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    user: state.user,
  }
}

export default connect(mapStateToProps, { editAccount, getAccount })(
  YourAccount
)
