import React from "react";
import Box from "@mui/material/Box";
import CustomDeleteIcon from "../CustomDeleteIcon/CustomDeleteIcon";
import UploadFile from "../UploadFile/UploadFile";
import DownloadFile from "../DownloadFile/DownloadFile";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";

const styleButton = {
  color: "black",
  height: "40px",
  width: "40px",
};

const CustomCrudIcons = ({
  setSelectedFrom,
  setSelectedTo,
  selectedFrom,
  selectedTo,
  fileName,
  sampleData = [],
  downloadData = [],
  handleDeleteAgree,
  handleFileSubmit,
  search,
  setSearch,
  handleAddButton,
  numSelected = [],
  downloadLoading,
}) => {
  return (
    <Box display="flex" flexWrap="wrap" paddingLeft="10px">
      {setSelectedFrom && (
        <CustomDatePicker
          selectedDate={selectedFrom}
          setSelectedDate={setSelectedFrom}
          maxDate={new Date()}
          id="From"
          label="From"
          style={{ width: "100px", marginTop: "-5px" }}
        />
      )}
      {setSelectedTo && (
        <CustomDatePicker
          selectedDate={selectedTo}
          setSelectedDate={setSelectedTo}
          maxDate={new Date()}
          id="To"
          label="To"
          style={{ width: "100px", marginTop: "-5px" }}
        />
      )}
      <Box display="flex" flexWrap="wrap">
        {numSelected.length > 0 && handleDeleteAgree && (
          <CustomDeleteIcon
            handleDeleteAgree={handleDeleteAgree}
            styleButton={styleButton}
          />
        )}

        {handleAddButton && (
          <Tooltip title="Add">
            <IconButton style={styleButton} onClick={handleAddButton}>
              <AddOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}

        {handleFileSubmit && (
          <UploadFile
            onFileUpload={handleFileSubmit}
            sampleData={sampleData}
            styleButton={styleButton}
          />
        )}

        {fileName && (
          <DownloadFile
            filename={fileName}
            downloadData={downloadData}
            styleButton={styleButton}
            loading={downloadLoading}
          />
        )}

        {setSearch && (
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            id="input-with-sx"
            placeholder="Search"
            variant="standard"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "150px", marginRight: "10px" }}
          />
        )}
      </Box>
    </Box>
  );
};

export default CustomCrudIcons;
