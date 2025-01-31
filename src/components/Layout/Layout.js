import React from "react";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import CustomTableOutput from "../CustomComponents/CustomTableOutput/CustomTableOutput";
import CustomCrudIcons from "../CustomComponents/CustomCrudIcons/CustomCrudIcons";
import CustomLoader from "../CustomComponents/CustomLoader/CustomLoader";

const Layout = ({
  children,
  title,
  handleDeleteAgree,
  handleFileSubmit,
  handleFile2Submit,
  handleEditButton,
  handleDownload,
  search,
  setSearch,
  data,
  mssgTitle,
  mssg,
  loading,
  tableRow,
  tableBodyFunc,
  numSelected,
  setNumSelected,
  handleAddButton,
  sampleData,
  sampleName,
  sampleData2,
  sampleName2,
  upload2ToolTip,
  setSelectedFrom,
  setSelectedTo,
  selectedFrom,
  selectedTo,
  downloadLoading,
  checkBoxCondition,
  defaultRowsPerPage,
  handleGo,
  handleDownload2,
  download2ToolTip,
}) => {
  // Show Loader in case loading during add, get, edit or delete
  if (loading) return <CustomLoader style={{ height: "80%" }} />;

  return (
    <React.Fragment>
      <Box display="flex">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} lg={3}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h5"
              style={{ margin: "10px 0 0 10px" }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid item container justifyContent="flex-end" xs={12} md={9} lg={9}>
            <CustomCrudIcons
              handleDeleteAgree={handleDeleteAgree}
              handleFileSubmit={handleFileSubmit}
              handleFile2Submit={handleFile2Submit}
              handleEditButton={handleEditButton}
              handleDownload={handleDownload}
              handleAddButton={handleAddButton}
              search={search}
              setSearch={setSearch}
              sampleName={sampleName}
              sampleData={sampleData}
              sampleName2={sampleName2}
              sampleData2={sampleData2}
              upload2ToolTip={upload2ToolTip}
              setSelectedFrom={setSelectedFrom}
              setSelectedTo={setSelectedTo}
              selectedFrom={selectedFrom}
              selectedTo={selectedTo}
              numSelected={numSelected}
              downloadLoading={downloadLoading}
              handleGo={handleGo}
              handleDownload2={handleDownload2}
              download2ToolTip={download2ToolTip}
            />
          </Grid>
        </Grid>
      </Box>
      {data ? (
        <CustomTableOutput
          data={data}
          mssgTitle={mssgTitle}
          mssg={mssg}
          loading={loading}
          tableRow={tableRow}
          tableBodyFunc={tableBodyFunc}
          numSelected={numSelected}
          setNumSelected={setNumSelected}
          checkBoxCondition={checkBoxCondition}
          selectedFrom={selectedFrom}
          selectedTo={selectedTo}
          search={search}
          defaultRowsPerPage={defaultRowsPerPage}
        />
      ) : (
        children
      )}
    </React.Fragment>
  );
};

export default connect(null, null)(Layout);
