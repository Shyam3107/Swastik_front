import React from "react";
import { CSVLink } from "react-csv";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function CustomDrop({
  downloadData,
  filename,
  styleButton,
  loading,
}) {
  return (
    <Tooltip title="Download">
      <IconButton style={styleButton} disabled={loading}>
        <CSVLink
          data={downloadData}
          filename={filename + ".csv"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <FileDownloadOutlinedIcon />
        </CSVLink>
      </IconButton>
    </Tooltip>
  );
}
