import React from "react"
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
import moment from "moment"

const CustomDatePicker = ({
  selectedDate,
  setSelectedDate,
  id,
  maxDate,
  minDate,
  label,
  style = {},
  disabled = false,
}) => {
  const handleDateChange = (date) => {
    if (id === "To") {
      date = moment(date).endOf("day")
    }
    setSelectedDate(new Date(date).toISOString())
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        id={id}
        autoOk={true}
        variant="inline"
        value={selectedDate}
        onChange={handleDateChange}
        format="dd/MM/yyyy"
        style={{ width: "100%", margin: "0 5px", ...style }}
        maxDate={maxDate}
        minDate={minDate}
        name={id}
        label={label}
        disabled={disabled}
      />
    </MuiPickersUtilsProvider>
  )
}

export default CustomDatePicker
