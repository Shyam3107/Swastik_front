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
  tempData = [],
  search,
  setSearch,
  handleAddButton,
}) => {
  return (
    <Box display="flex">
      {setSelectedFrom && setSelectedTo && (
        <React.Fragment>
          <CustomDatePicker
            selectedDate={selectedFrom}
            setSelectedDate={setSelectedFrom}
            maxDate={new Date()}
            defaultValue="From"
          />
          <CustomDatePicker
            selectedDate={selectedTo}
            setSelectedDate={setSelectedTo}
            maxDate={new Date()}
            defaultValue="To"
          />
        </React.Fragment>
      )}

      {handleDeleteAgree && (
        <CustomDeleteIcon
          handleDeleteAgree={handleDeleteAgree}
          styleButton={styleButton}
        />
      )}

      {handleAddButton && (
        <IconButton style={styleButton} onClick={handleAddButton}>
          <AddOutlinedIcon />
        </IconButton>
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
        />
      )}
    </Box>
  );
};

export default CustomCrudIcons;
