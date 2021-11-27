import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import CustomTableOutput from "../CustomComponents/CustomTableOutput/CustomTableOutput";
import CustomCrudIcons from "../CustomComponents/CustomCrudIcons/CustomCrudIcons";
import CustomLoader from "../CustomComponents/CustomLoader/CustomLoader";

const Layout = ({
  addLoading,
  editLoading,
  title,
  handleDeleteAgree,
  handleFileSubmit,
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
}) => {
  if (addLoading || editLoading)
    return <CustomLoader style={{ height: "80%" }} />;
  return (
    <Box
      sx={{
        width: "100%",
        justifyContent: "center",
        display: "flex",
        paddingTop: "20px",
      }}
    >
      <Paper sx={{ width: "96%", mb: 2 }}>
        <Box display="flex">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h5"
                style={{ margin: "10px 0 0 10px" }}
              >
                {title}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomCrudIcons
                handleDeleteAgree={handleDeleteAgree}
                handleFileSubmit={handleFileSubmit}
                search={search}
                setSearch={setSearch}
                fileName={fileName}
                handleAddButton={handleAddButton}
                downloadData={downloadData}
                sampleData={sampleData}
              />
            </Grid>
          </Grid>
        </Box>
        <CustomTableOutput
          data={data}
          mssgTitle={mssgTitle}
          mssg={mssg}
          loading={loading}
          tableRow={tableRow}
          tableBodyFunc={tableBodyFunc}
          numSelected={numSelected}
          setNumSelected={setNumSelected}
        />
      </Paper>
    </Box>
  );
};

export default connect(null, null)(Layout);
