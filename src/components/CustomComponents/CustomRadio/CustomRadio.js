import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"

const CustomRadio = (props) => {
  return (
    <Grid container>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby={props.label}
          name={props.label}
          onChange={props.handleChange}
          value={props.value}
        >
          {props.options.map((val, index) => {
            return (
              <FormControlLabel
                value={val.value}
                control={<Radio />}
                label={val.label}
                key={index}
              />
            )
          })}
        </RadioGroup>
      </FormControl>
    </Grid>
  )
}

export default CustomRadio
