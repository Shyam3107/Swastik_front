import React from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"

// Select from suggested options and take value from user too
const CustomAutoComplete = ({
  options = [],
  handleChange,
  id = "autoComplete",
  value,
  style = {},
}) => {
  // options is array of ["option1","option2","option3"]
  options.sort()

  const handleSelectChange = (e, val) => {
    handleChange(val)
  }

  return (
    <Autocomplete
      options={options}
      id={id}
      renderInput={(params) => <TextField {...params} variant="standard" />}
      value={value}
      onInputChange={handleSelectChange}
      isOptionEqualToValue={(option, val) => option !== val}
      groupBy={(val) => val && val[0]}
      style={style}
    />
  )
}
export default CustomAutoComplete
