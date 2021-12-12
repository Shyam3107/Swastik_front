import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

import useValidate from "../CustomComponents/CustomHooks/useValidate";
import CustomLoader from "../CustomComponents/CustomLoader/CustomLoader";
import { editAccount, addAccount } from "../../containers/Accounts/action";

const initialForm = { userName: "", location: "", password: "" };

const AddEmployeeAccount = (props) => {
  const [form, setForm] = useState(initialForm);
  const [error, handleValidate] = useValidate();

  const { initialFields } = props;
  const { addLoading, editLoading } = props.accounts;
  const submitLoading = addLoading || editLoading;

  useEffect(() => {
    if (initialFields)
      setForm({
        userName: initialFields.userName,
        location: initialFields.location,
      });
  }, [initialFields, setForm]);

  let inputFields = [
    { label: "User Name", id: "userName", required: true },
    { label: "Location", id: "location", required: true },
  ];

  if (!initialFields)
    inputFields.push({ label: "Password", id: "password", required: true });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    handleValidate(e.target.name, e.target.value);
  };

  const handleSubmit = () => {
    const cb = () => {
      props.setState("Manage");
      props.setAccountData(null);
    };
    if (initialFields) props.editAccount(form, cb);
    else props.addAccount(form, cb);
  };

  const handleReset = () => {
    setForm(initialForm);
  };

  const handleCancel = () => {
    props.setState("Manage");
    props.setAccountData(null);
  };

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
          );
        })}
      </Grid>
      <Grid
        container
        style={{ padding: "20px", width: "100%", justifyContent: "center" }}
        spacing={1}
      >
        <Grid item sm={3} md={3} lg={1} onClick={handleCancel}>
          <Button disabled={submitLoading} variant="contained">
            Cancel
          </Button>
        </Grid>
        <Grid item sm={3} md={3} lg={1} onClick={handleReset}>
          <Button disabled={submitLoading} variant="contained">
            Reset
          </Button>
        </Grid>
        <Grid item sm={3} md={3} lg={1} onClick={handleSubmit}>
          <Button
            variant="contained"
            disabled={
              Object.keys(error).length !== 0 ||
              !Object.values(form).every((val) => val) ||
              submitLoading
            }
          >
            {submitLoading ? (
              <CustomLoader
                style={{ margin: "0", padding: "0 15px" }}
                circleStyle={{ width: "25px", height: "auto" }}
              />
            ) : (
              "Submit"
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    user: state.user,
  };
};

export default connect(mapStateToProps, { addAccount, editAccount })(
  AddEmployeeAccount
);
