import Typography from "@mui/material/Typography"

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      2022 SWASTIK MINERALS
      {"."}
    </Typography>
  )
}

export default Copyright
