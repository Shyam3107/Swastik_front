import { useState } from "react";
import { connect } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BackDropLoader from "../CustomComponents/BackDropLoader/BackDropLoader";
import { userLogin } from "../../containers/Login/action";
import { useHistory } from "react-router";
import { ROUTES } from "../../utils/constants";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()} SWASTIK MINERALS
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Login = (props) => {
  let initialForm = JSON.parse(localStorage.getItem("auth"));
  if (!initialForm)
    initialForm = {
      userName: "",
      password: "",
      remember: true,
    };
  const loading = props.user.loading;
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialForm);

  const cb = () => {
    if (form.remember) localStorage.setItem("auth", JSON.stringify(form));
    else localStorage.removeItem("auth");
    history.push(ROUTES.PROFILE);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.userLogin(form, cb);
  };

  const history = useHistory();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleFormChange = (e) => {
    setForm((form) => ({ ...form, [e.target.id]: e.target.value }));
  };

  return (
    <ThemeProvider theme={theme}>
      {loading && <BackDropLoader />}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://cdn.imgbin.com/12/19/9/imgbin-cargo-freight-forwarding-agency-freight-transport-logistics-shipping-assorted-transportation-miniature-5ErH6wjuZ68PLXjccpAtGLj0M.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
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
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                value={form.userName}
                label="User Name"
                name="userName"
                autoComplete="email"
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
                autoComplete="current-password"
                onChange={handleFormChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                      >
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
              {/* <Grid container> // uncomment if want to add forgot password feature
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { userLogin })(Login);
