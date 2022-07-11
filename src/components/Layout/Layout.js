import React from "react"
import { connect } from "react-redux"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import CustomTableOutput from "../CustomComponents/CustomTableOutput/CustomTableOutput"
import CustomCrudIcons from "../CustomComponents/CustomCrudIcons/CustomCrudIcons"
import CustomLoader from "../CustomComponents/CustomLoader/CustomLoader"

const Layout = ({
  children,
  addLoading,
  editLoading,
  deleteLoading,
  title,
  handleDeleteAgree,
  handleFileSubmit,
  handleEditButton,
  search,
  setSearch,
  data,
  mssgTitle,
  mssg,
  loading,
  tableRow,
  tableBodyFunc,
  numSelected,
  fileName,
  setNumSelected,
  handleAddButton,
  downloadData,
  sampleData,
  sampleName,
  setSelectedFrom,
  setSelectedTo,
  selectedFrom,
  selectedTo,
  downloadLoading,
  checkBoxCondition,
}) => {
  if (addLoading || editLoading || deleteLoading || loading)
    return <CustomLoader style={{ height: "80%" }} />
  return (
    <React.Fragment>
      <Box display="flex">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h5"
              style={{ margin: "10px 0 0 10px" }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <CustomCrudIcons
              handleDeleteAgree={handleDeleteAgree}
              handleFileSubmit={handleFileSubmit}
              handleEditButton={handleEditButton}
              search={search}
              setSearch={setSearch}
              fileName={fileName}
              sampleName={sampleName}
              handleAddButton={handleAddButton}
              downloadData={downloadData}
              sampleData={sampleData}
              setSelectedFrom={setSelectedFrom}
              setSelectedTo={setSelectedTo}
              selectedFrom={selectedFrom}
              selectedTo={selectedTo}
              numSelected={numSelected}
              downloadLoading={downloadLoading}
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
        />
      ) : (
        children
      )}
    </React.Fragment>
  )
}

export default connect(null, null)(Layout)
