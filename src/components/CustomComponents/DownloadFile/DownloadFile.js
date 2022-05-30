import React, { useState } from "react"
import { Paper, Typography, Popper } from "@mui/material"
import { CSVLink } from "react-csv"
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

import styles from "./styles.module.css"
import { arrayToObj } from "../../../utils/convertCSVtoJSON"
import DownloadExcel from "../DownloadExcel/DownloadExcel"

export default function CustomDrop({
  downloadData,
  filename,
  styleButton,
  loading,
}) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)

  let downloadDataExcel = arrayToObj(downloadData)

  let column = downloadData[0]

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
          <Typography className={styles.button}>
            <CSVLink
              data={downloadData}
              filename={filename + ".csv"}
              style={{ textDecoration: "none", color: "black" }}
            >
              CSV
            </CSVLink>
          </Typography>
          <Typography className={styles.button}>
            <DownloadExcel
              filename={filename}
              data={downloadDataExcel}
              column={column}
            />
          </Typography>
        </Paper>
      </Popper>
    </React.Fragment>
  )
}
