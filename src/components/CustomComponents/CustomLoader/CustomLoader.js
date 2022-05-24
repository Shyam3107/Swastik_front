import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"
import React from "react"

export default function Loader({ skeleton, style = {}, circleStyle = {} }) {
  return skeleton ? (
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      margin="0px auto"
      style={style}
    >
      <Skeleton variant="text" width="100px" />
    </Box>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      margin="20px auto"
      style={style}
    >
      <CircularProgress style={circleStyle} color="primary" />
    </Box>
  )
}
