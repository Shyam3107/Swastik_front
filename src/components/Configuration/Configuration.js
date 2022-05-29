import { useState } from "react"
import { connect } from "react-redux"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import YourAccount from "./YourAccount"
import ManageEmployeeAccount from "./ManageEmployeeAccount"
import { access, isOperationAllowed, operations } from "../../utils/utilities"

const Configuration = () => {
  const [title, setTitle] = useState("Your Account")

  const titleBar = [
    {
      title: "Your Account",
    },
  ]

  if (isOperationAllowed(access.ACCOUNTS, operations.CREATE))
    titleBar.push({ title: "Manage Employee Accounts" })

  const SwitchFunc = () => {
    switch (title) {
      case "Your Account":
        return <YourAccount />
      case "Manage Employee Accounts":
        return <ManageEmployeeAccount />
      default:
        return
    }
  }

  return (
    <Box paddingLeft="2%" backgroundColor="#C5E9EA" marginTop="-10px">
      <Grid container marginBottom="20px">
        {titleBar.map((item, index) => {
          return (
            <Grid
              key={index}
              item
              style={{
                cursor: "pointer",
                borderBottom: item.title === title ? "2px solid blue " : "none",
                textAlign: "center",
                marginRight: "20px",
                marginTop: "10px",
              }}
            >
              <h5 onClick={() => setTitle(item.title)}>{item.title}</h5>
            </Grid>
          )
        })}
      </Grid>
      <Box paddingBottom="30px">
        <SwitchFunc />
      </Box>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Configuration)
