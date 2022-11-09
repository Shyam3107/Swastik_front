import DatePicker from "react-datepicker"
import { TextField } from "@mui/material"

import "react-datepicker/dist/react-datepicker.css"

const ReactDatePicker = ({
  selectedDate,
  setSelectedDate,
  id,
  maxDate,
  label,
  style = {},
  required,
}) => {
  const handleDateChange = (date) => {
    const value = date ? new Date(date) : required ? new Date() : null
    setSelectedDate(value)
  }

  console.log("Selected Date", selectedDate)

  return (
    <DatePicker
      selected={selectedDate}
      id={id}
      dateFormat="dd/MM/yyyy"
      todayButton="Today"
      isClearable
      customInput={
        <TextField id={id} label={label} variant="standard" style={style} />
      }
      autoComplete="false"
      maxDate={maxDate}
      onChange={handleDateChange}
    />
  )
}

export default ReactDatePicker
