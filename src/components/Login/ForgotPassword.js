import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import styles from "./styles.module.css";
import { forgotPassword } from "../../containers/Login/action";
import { withRouter } from "react-router";
import Copyright from "./CopyRight";

const ForgotPassword = (props) => {
  let loading = props.user.loading;
  const [showPassword, setShowPassword] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    password: "",
    secretKey: "",
  });

  const cb = () => {
    props.setLoginPage(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.forgotPassword(form, cb);
  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleShowSecretKey = () => {
    setShowSecretKey((show) => !show);
  };

  const handleFormChange = (e) => {
    setForm((form) => ({ ...form, [e.target.id]: e.target.value }));
  };

  loading =
    loading || !Boolean(form.userName && form.password && form.secretKey);

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
          label="New Password"
          value={form.password}
          type={showPassword ? "text" : "password"}
          id="password"
          onChange={handleFormChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end" aria-label="showPassword">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="secretKey"
          label="Secret Key"
          value={form.secretKey}
          type={showSecretKey ? "text" : "password"}
          id="secretKey"
          onChange={handleFormChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowSecretKey} edge="end" aria-label="showKey">
                  {showSecretKey ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          Reset
        </Button>
        <Grid container style={{ textAlign: "center" }}>
          <Grid
            item
            xs
            className={styles.forgotPassword}
            onClick={() => props.setLoginPage(true)}
          >
            Sign In ?
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default withRouter(
  connect(mapStateToProps, { forgotPassword })(ForgotPassword)
);
