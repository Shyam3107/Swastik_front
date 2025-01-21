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
import {
  accessOptions,
  initialForm,
  operationsOptions,
  showTripsOptions,
} from "./constants";
import CustomCheckBox from "../CustomComponents/CustomCheckBox/CustomCheckBox";
import CustomDatePicker from "../CustomComponents/CustomDatePicker/CustomDatePicker";
import CustomRadio from "../CustomComponents/CustomRadio/CustomRadio";

const AddEmployeeAccount = (props) => {
  const [form, setForm] = useState(initialForm);
  const [error, handleValidate] = useValidate();

  const { initialFields } = props;
  const { loading } = props.accounts;

  useEffect(() => {
    if (initialFields)
      setForm({ ...initialForm, ...initialFields, password: "" });
  }, [initialFields, setForm]);

  const handleCheckBox = (field, value, checked) => {
    let temp = [...form[field]];
    if (checked) {
      temp = [...form[field], value];
      setForm({ ...form, [field]: temp });
    } else {
      const index = form[field].indexOf(value);
      if (index !== -1) {
        temp.splice(index, 1);
        setForm({ ...form, [field]: temp });
      }
    }
  };

  let inputFields = [
    { label: "User Name", id: "userName", required: true },
    { label: "Consignor", id: "consignor" },
    { label: "Branch", id: "branch" },
    {
      label: "Password",
      id: "password",
      required: initialFields ? false : true,
    },
    { label: "Phone No.", id: "phone" },
    { label: "Phone No. 2", id: "phone2" },
    { label: "Company Name", id: "companyName" },
    { label: "T.P.T Code", id: "tptCode" },
    {
      label: "Access",
      id: "access",
      type: "CHECKBOX",
      options: accessOptions,
      handleChange: (value, checked) => {
        handleCheckBox("access", value, checked);
      },
      lg: 12,
      md: 12,
      sm: 12,
      value: form.access,
    },
    {
      label: "Operations",
      id: "operations",
      type: "CHECKBOX",
      options: operationsOptions,
      handleChange: (value, checked) => {
        handleCheckBox("operations", value, checked);
      },
      lg: 12,
      md: 12,
      sm: 12,
      value: form.operations,
    },
    {
      label: "Show Trips",
      id: "showTrips",
      type: "RADIO",
      options: showTripsOptions,
      handleChange: (value) => {
        setForm({ ...form, showTrips: value.target.value });
      },
      ld: 6,
      md: 5,
      sm: 6,
      value: form.showTrips,
    },
    {
      label: "Entries Last Checked",
      id: "entriesLastChecked",
      type: "DATE",
      handleChange: (value) => {
        setForm({ ...form, entriesLastChecked: value });
      },
      value: form.entriesLastChecked,
    },
  ];

  const handleSubmit = () => {
    const cb = () => {
      props.setState("Manage");
      props.setAccountData(null);
    };
    if (initialFields) props.editAccount(form, cb);
    else props.addAccount(form, cb);
  };

  const handleReset = () => {
    if (initialFields)
      setForm({ ...initialForm, ...initialFields, password: "" });
    else setForm(initialForm);
  };

  const handleCancel = () => {
    props.setState("Manage");
    props.setAccountData(null);
  };

  return (
    <Box>
      <Grid container style={{ width: "100%" }} spacing={4}>
        {inputFields.map((item) => {
          const handleInputChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value });
            if (item.required) handleValidate(e.target.name, e.target.value);
          };
          return (
            <Grid
              item
              xs={item.xs ? item.xs : 12}
              sm={item.sm ? item.sm : 5}
              md={item.md ? item.md : 4}
              lg={item.lg ? item.lg : 3}
              key={item.label}
            >
              <Typography variant="h6">
                {item.label}
                {item.required && <span style={{ color: "red" }}>*</span>}
              </Typography>
              {item.type === "CHECKBOX" && (
                <CustomCheckBox
                  value={item.value}
                  options={item.options}
                  handleChange={item.handleChange}
                />
              )}
              {item.type === "RADIO" && (
                <CustomRadio
                  value={item.value}
                  options={item.options}
                  label={item.label}
                  handleChange={item.handleChange}
                  lg={item.lg}
                  md={item.md}
                  sm={item.sm}
                />
              )}
              {item.type === "DATE" && (
                <Grid container>
                  <CustomDatePicker
                    selectedDate={
                      item.value ? item.value : new Date("2000-01-01")
                    }
                    id={item.id}
                    setSelectedDate={item.handleChange}
                    maxDate={new Date()}
                  />
                </Grid>
              )}
              {item.type == null && (
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
              )}
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
        <Grid
          item
          sm={3}
          md={3}
          lg={1}
          onClick={handleCancel}
          marginRight="10px"
        >
          <Button disabled={loading} variant="contained">
            Cancel
          </Button>
        </Grid>
        <Grid item sm={3} md={3} lg={1} onClick={handleReset}>
          <Button disabled={loading} variant="contained">
            Reset
          </Button>
        </Grid>
        <Grid item sm={3} md={3} lg={1} onClick={handleSubmit}>
          <Button
            variant="contained"
            disabled={
              Object.keys(error).length !== 0 ||
              !form.userName ||
              loading ||
              (!initialFields && !form.password)
            }
          >
            {loading ? (
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
  };
};

export default connect(mapStateToProps, { addAccount, editAccount })(
  AddEmployeeAccount
);
