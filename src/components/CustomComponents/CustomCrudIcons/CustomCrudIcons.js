import React from "react"
import Box from "@mui/material/Box"
import CustomDeleteIcon from "../CustomDeleteIcon/CustomDeleteIcon"
import UploadFile from "../UploadFile/UploadFile"
import DownloadFile from "../DownloadFile/DownloadFile"
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"
import EditIcon from "@mui/icons-material/Edit"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import Tooltip from "@mui/material/Tooltip"
import Grid from "@mui/material/Grid"
import PrintIcon from "@mui/icons-material/Print"

const styleButton = {
  color: "black",
  height: "40px",
  width: "40px",
}

const CustomCrudIcons = ({
  setSelectedFrom,
  setSelectedTo,
  selectedFrom,
  selectedTo,
  fileName,
  sampleName,
  sampleData = [],
  downloadData = [],
  handleDeleteAgree,
  handleFileSubmit,
  search,
  setSearch,
  handleAddButton,
  handleEditButton,
  numSelected = [],
  downloadLoading,
  print = false,
}) => {
  return (
    <Box width="100%">
      <Grid container justifyContent="flex-end">
        <Grid
          item
          lg={5}
          md={5}
          sm={5}
          xs={10}
          display="flex"
          justifyContent="flex-end"
        >
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
        </Grid>

        <Grid
          item
          lg={7}
          md={7}
          sm={7}
          xs={12}
          paddingTop="5px"
          display="flex"
          justifyContent="flex-end"
        >
          {print && (
            <Tooltip title="Print">
              <IconButton style={styleButton} onClick={() => window.print()} aria-label="print">
                <PrintIcon />
              </IconButton>
            </Tooltip>
          )}
          {numSelected.length > 0 && handleDeleteAgree && (
            <CustomDeleteIcon
              handleDeleteAgree={handleDeleteAgree}
              styleButton={styleButton}
            />
          )}

          {handleAddButton && (
            <Tooltip title="Add">
              <IconButton style={styleButton} onClick={handleAddButton} aria-label="add">
                <AddOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}

          {handleEditButton && numSelected.length === 1 && (
            <Tooltip title="Edit">
              <IconButton style={styleButton} onClick={handleEditButton} aria-label="edit">
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}

          {handleFileSubmit && (
            <UploadFile
              onFileUpload={handleFileSubmit}
              sampleData={sampleData}
              styleButton={styleButton}
              sampleName={sampleName}
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
        </Grid>
      </Grid>
    </Box>
  )
}

export default CustomCrudIcons
