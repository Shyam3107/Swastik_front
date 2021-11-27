import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export default function CustomDateTimePicker({ value, setValue, id, minDate }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        minDate={minDate ? minDate : new Date()}
        id={id}
        style={{ width: "200px" }}
        value={value}
        onChange={(dat) =>
          setValue((state) => ({ ...state, [id]: dat.toISOString() }))
        }
        format="dd/MM/yyyy HH:mm"
      />
    </MuiPickersUtilsProvider>
  );
}
