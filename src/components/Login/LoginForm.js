import React, { useState } from "react"
import { connect } from "react-redux"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

import styles from "./styles.module.css"
import { userLogin } from "../../containers/Login/action"
import { withRouter } from "react-router"
import { ROUTES } from "../../utils/constants"
import Copyright from "./CopyRight"

const LoginForm = (props) => {
  let initialForm = JSON.parse(localStorage.getItem("auth"))
  if (!initialForm)
    initialForm = {
      userName: "",
      password: "",
      remember: true,
    }

  let loading = props.user.loading
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState(initialForm)

  const cb = () => {
    if (form.remember) localStorage.setItem("auth", JSON.stringify(form))
    else localStorage.removeItem("auth")
    history.push(ROUTES.PROFILE)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.userLogin(form, cb)
  }

  const history = props.history

  const handleShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const handleFormChange = (e) => {
    setForm((form) => ({ ...form, [e.target.id]: e.target.value }))
  }

  loading = loading || !Boolean(form.userName && form.password)

  return (
    <React.Fragment>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="userName"
          value={form.userName}
          label="User Name"
          name="userName"
          onChange={handleFormChange}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          value={form.password}
          type={showPassword ? "text" : "password"}
          id="password"
          onChange={handleFormChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              id="remember"
              value="remember"
              color="primary"
              checked={form.remember}
              onChange={() =>
                setForm((form) => ({ ...form, remember: !form.remember }))
              }
            />
          }
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          Sign In
        </Button>
        <Grid container style={{ textAlign: "center" }}>
          <Grid
            item
            xs
            className={styles.forgotPassword}
            onClick={() => props.setLoginPage(false)}
          >
            Forgot password ?
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
        <p
          style={{
            color: "rgba(0, 0, 0, 0.6)",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          For any help, Contact 8109292093
        </p>
      </Box>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default withRouter(connect(mapStateToProps, { userLogin })(LoginForm))
