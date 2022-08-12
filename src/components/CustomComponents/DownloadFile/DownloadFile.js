import React, { useState } from "react"
import { Paper, Popper, Button } from "@mui/material"
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

import styles from "./styles.module.css"

export default function CustomDrop({
  styleButton,
  handleDownload,
  loading = false,
}) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)

  return (
    <React.Fragment>
      <Tooltip title="Download">
        <IconButton
          style={styleButton}
          disabled={loading}
          onClick={handleClick}
          aria-label="fileDownload"
        >
          <FileDownloadOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Popper open={open} anchorEl={anchorEl}>
        <Paper style={{ padding: "5px" }}>
          {/* <Typography className={styles.button}>CSV</Typography> */}
          <Button
            disabled={loading}
            className={styles.button}
            onClick={handleDownload}
          >
            Excel
          </Button>
        </Paper>
      </Popper>
    </React.Fragment>
  )
}
