import React from "react"
import { connect } from "react-redux"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FormHelperText from "@mui/material/FormHelperText"

import { InputTypes } from "../../utils/constants"
import CustomLoader from "../CustomComponents/CustomLoader/CustomLoader"
import CustomDatePicker from "../CustomComponents/CustomDatePicker/CustomDatePicker"
import CustomSelectInput from "../CustomComponents/CustomSelectInput/CustomSelectInput"
import useValidate from "../CustomComponents/CustomHooks/useValidate"
import CustomSwitch from "../CustomComponents/CustomSwitch/CustomSwitch"
import CustomAutoComplete from "../CustomComponents/CustomAutoComplete/CustomAutoComplete"
import CustomAutoCompleteSelect from "../CustomComponents/CustomAutoCompleteSelect/CustomAutoCompleteSelect"

const LayoutAdd = ({
  loading,
  title,
  edit,
  inputFields = [],
  handleValueChange, // User defined handle change
  handleCancel,
  handleReset,
  handleSubmit,
  handle4thButton,
  button4thName,
  data,
}) => {
  const [error, handleValidate] = useValidate()

  let submitButtonDisable = false

  if (loading) return <CustomLoader style={{ height: "80%" }} />

  return (
    <React.Fragment>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h5"
        style={{ marginLeft: "10px" }}
      >
        {edit ? "Edit " : "Add "} {title}
      </Typography>
      <span
        style={{
          fontSize: "13px",
          color: "red",
          marginRight: "15px",
          display: "flex",
          justifyContent: "end",
          fontWeight: "600",
        }}
      >
        * Mandatory Fields
      </span>
      <Grid container style={{ padding: "20px", width: "100%" }} spacing={4}>
        {inputFields.map((item) => {
          const isTypeTextNumber = item.type ? item.type === InputTypes.NUMBER : true

          if (item.required && !(item.value || data[item.id]))
            submitButtonDisable = true

          const handleInputChange = (event) => {
            // If handle change define in item then use it else use custom one
            if (item.handleChange) item.handleChange(event)
            else handleValueChange(event)

            if (item.type === InputTypes.CUSTOM_SELECT)
              event = { target: { name: item.id, value: event } }

            if (item.required)
              handleValidate(
                event.target.name,
                event.target.value,
                item.customValidate
              )
          }

          return (
            <Grid item xs={12} sm={5} md={4} lg={3} key={item.label}>
              <Typography variant="h6">
                {item.label}
                {item.required && <span style={{ color: "red" }}>*</span>}
              </Typography>
              {isTypeTextNumber && (
                <TextField
                  id={item.id}
                  variant="standard"
                  style={{ width: "100%" }}
                  value={item.value ? item.value : data[item.id]}
                  type={item.type ? item.type : "text"}
                  onChange={handleInputChange}
                  name={item.id}
                  error={Boolean(error[item.id])}
                  onBlur={handleInputChange}
                  disabled={item.disabled ?? false}
                  onWheel={(e) => e.target.blur()}
                />
              )}
              {item.type === InputTypes.DATE && (
                <CustomDatePicker
                  selectedDate={item.value ? item.value : data[item.id]}
                  id={item.id}
                  setSelectedDate={handleInputChange}
                  maxDate={item.maxDate}
                  disabled={item.disabled}
                  minDate={item.minDate}
                />
              )}
              {item.type === InputTypes.SELECT && (
                <CustomSelectInput
                  id={item.id}
                  value={item.value ? item.value : data[item.id]}
                  handleChange={handleInputChange}
                  menuItems={item.menuItems}
                  disabled={item.disabled}
                />
              )}
              {item.type === InputTypes.CUSTOM_SELECT && (
                <CustomAutoComplete
                  options={item.options}
                  id={item.id}
                  handleChange={handleInputChange}
                  disabled={item.disabled}
                  value={item.value ? item.value : data[item.id]}
                />
              )}
              {item.type === InputTypes.SELECT_AUTO_COMPLETE && (
                <CustomAutoCompleteSelect
                  options={item.options}
                  id={item.id}
                  handleChange={handleInputChange}
                  value={item.value ? item.value : data[item.id]}
                />
              )}
              {item.type === InputTypes.SWITCH &&
                <CustomSwitch
                  id={item.id}
                  handleChange={handleInputChange}
                  value={item.value ? item.value : data[item.id]}
                />}
              <FormHelperText error={Boolean(error[item.id])}>
                {error[item.id]}
              </FormHelperText>
            </Grid>
          )
        })}
      </Grid>
      <Grid
        container
        style={{ padding: "20px", width: "100%", justifyContent: "center" }}
        spacing={1}
      >
        <Grid item sm={3} md={3} lg={1} marginRight="10px">
          <Button onClick={handleCancel} variant="contained">
            Cancel
          </Button>
        </Grid>
        <Grid item sm={3} md={3} lg={1}>
          <Button variant="contained" onClick={handleReset}>
            Reset
          </Button>
        </Grid>
        <Grid item sm={3} md={3} lg={1}>
          <Button
            variant="contained"
            disabled={
              submitButtonDisable || loading || Object.keys(error).length !== 0
            }
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
        {/* Optional 4th Button */
          button4thName && <Grid item sm={3} md={3} lg={1}>
            <Button
              variant="contained"
              disabled={
                submitButtonDisable || loading || Object.keys(error).length !== 0
              }
              onClick={handle4thButton}
            >
              {button4thName}
            </Button>
          </Grid>}
      </Grid>
    </React.Fragment>
  )
}

export default connect(null, null)(LayoutAdd)
