import React from "react";
import { CSVLink } from "react-csv";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import IconButton from "@mui/material/IconButton";

export default function CustomDrop({ downloadData, filename, styleButton }) {
  return (
    <IconButton style={styleButton}>
      <CSVLink
        data={downloadData}
        filename={filename + ".csv"}
        style={{ textDecoration: "none", color: "black" }}
      >
        <FileDownloadOutlinedIcon />
      </CSVLink>
    </IconButton>
  );
}
