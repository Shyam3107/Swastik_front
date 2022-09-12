import * as React from "react"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Grid from "@mui/material/Grid"

export default function CustomCheckBox({ options, handleChange, value }) {
  const handleCheck = (e) => {
    handleChange(e.target.value, e.target.checked)
  }
  return (
    <Grid container>
      {options.map((option) => {
        return (
          <Grid item lg={2} md={3} sm={6} xs={12} key={option.label}>
            <FormControlLabel
              value={option.id}
              control={
                <Checkbox
                  checked={value.indexOf(option.id) !== -1 ? true : false}
                />
              }
              label={option.label}
              labelPlacement="end"
              onChange={handleCheck}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
