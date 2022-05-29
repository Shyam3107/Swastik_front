import { useState } from "react"
import { connect } from "react-redux"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Avatar from "@mui/material/Avatar"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import BackDropLoader from "../CustomComponents/BackDropLoader/BackDropLoader"
import { withRouter } from "react-router"
import Background from "./Background"
import LoginForm from "./LoginForm"
import ForgotPassword from "./ForgotPassword"

const theme = createTheme()

const Login = (props) => {
  const [loginPage, setLoginPage] = useState(true)
  const loading = props.user.loading

  return (
    <ThemeProvider theme={theme}>
      {loading && <BackDropLoader />}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Background />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {loginPage ? "Sign in" : "Reset Password"}
            </Typography>
            {loginPage ? (
              <LoginForm setLoginPage={setLoginPage} />
            ) : (
              <ForgotPassword setLoginPage={setLoginPage} />
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default withRouter(connect(mapStateToProps)(Login))
