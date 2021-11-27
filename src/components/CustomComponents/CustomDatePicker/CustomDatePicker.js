import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";

const CustomDatePicker = ({
  selectedDate,
  setSelectedDate,
  defaultValue,
  maxDate,
}) => {
  const handleDateChange = (date) => {
    console.log("Date : ", date);
    if (defaultValue === "To") {
      date = moment().endOf("day");
    }
    setSelectedDate(new Date(date).toISOString());
  };

  return (
    <div
      style={{
        width: "190px",
      }}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          id="date-picker-dialog"
          label={defaultValue}
          autoOk={true}
          variant="inline"
          value={selectedDate}
          onChange={handleDateChange}
          format="dd/MM/yyyy"
          style={{ width: "90%" }}
          maxDate={maxDate}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default CustomDatePicker;
