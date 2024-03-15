import React, { useState, useRef, useMemo } from "react"
import {
  Paper,
  Typography,
  Button,
  MenuItem,
  Popper,
  Box,
  MenuList,
} from "@mui/material"
import { CSVLink } from "react-csv"
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

import { arrayToObj } from "../../../utils/convertCSVtoJSON"
import DownloadExcel from "../DownloadExcel/DownloadExcel"

export default function UploadFile({
  onFileUpload,
  sampleData = [[]],
  sampleName = "Sample File",
  styleButton,
  toolTip
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState(null)
  const inputRef = useRef(null)

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleUpload = () => {
    onFileUpload(file)
    setFile(null)
    setFileName(null)
    inputRef.current.value = null
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const sampleDataExcel = useMemo(() => arrayToObj(sampleData), [sampleData])

  let column = sampleData[0]

  return (
    <React.Fragment>
      <Tooltip title={toolTip ?? "Upload"}>
        <IconButton style={styleButton} onClick={handleClick} aria-label="fileUpload">
          <FileUploadOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Popper open={open} anchorEl={anchorEl}>
        <Paper style={{ padding: "10px" }}>
          <Typography style={{ fontWeight: 600, textAlign: "center" }}>
            {toolTip ?? "Upload"}
          </Typography>
          <MenuList>
            <MenuItem style={{ justifyContent: "center" }}>
              <CSVLink
                filename={sampleName + ".csv"}
                data={sampleData}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: 400,
                  fontSize: "14px",
                }}
                onClick={() => handleClick()}
              >
                Download CSV Sample
              </CSVLink>
            </MenuItem>
            <MenuItem>
              <DownloadExcel
                filename={sampleName}
                data={sampleDataExcel}
                column={column}
                element="Download Excel Sample"
              />
            </MenuItem>
            <MenuItem style={{ justifyContent: "center" }}>
              <Typography>
                <input
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  style={{ display: "none" }}
                  id="contained-button-file"
                  type="file"
                  ref={inputRef}
                  onChange={(e) => {
                    setFile(e.target.files[0])
                    setFileName(e.target.files[0] ? e.target.files[0].name : "")
                  }}
                />
                <label htmlFor="contained-button-file">
                  {fileName ? fileName : "Select a File"}
                </label>
              </Typography>
            </MenuItem>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              <Button
                style={{ fontSize: "13px", padding: "7px 10px" }}
                variant="contained"
                onClick={handleUpload}
                disabled={file ? false : true}
              >
                Upload
              </Button>
            </Box>
          </MenuList>
        </Paper>
      </Popper>
    </React.Fragment>
  )
}
