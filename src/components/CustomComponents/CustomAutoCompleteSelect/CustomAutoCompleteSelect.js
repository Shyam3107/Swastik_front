import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"

// This is to select value from options only
const CustomAutoCompleteSelect = ({
  id,
  options = [], // options is array of {label:"hey",id:"sh"}
  value,
  handleChange,
  style = {},
}) => {
  const handleFieldChange = (e, val) => {
    handleChange({ target: { name: id, value: val?.id } })
  }

  return (
    <Autocomplete
      id={id}
      value={options.filter((v) => v.id === value)[0]}
      options={options}
      onChange={handleFieldChange}
      getOptionLabel={(option) => option.label ?? option}
      renderInput={(params) => <TextField {...params} variant="standard" />}
      style={style}
      isOptionEqualToValue={(option, val) =>
        option?.label === val?.label && option?.id === val?.id
      }
    />
  )
}

export default CustomAutoCompleteSelect
