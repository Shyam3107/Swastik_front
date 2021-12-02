import React from "react";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import CustomLoader from "../CustomComponents/CustomLoader/CustomLoader";
import CustomCrudIcons from "../CustomComponents/CustomCrudIcons/CustomCrudIcons";

const LayoutView = ({
  loading,
  title,
  viewFields = [],
  data,
  handleBack,
  handleDeleteAgree,
  handleEditButton,
  handleAddButton,
  numSelected,
}) => {
  if (loading) return <CustomLoader style={{ height: "80%" }} />;

  return (
    <React.Fragment>
      <Box display="flex">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h5"
              style={{ marginLeft: "20px", fontWeight: "600" }}
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
              handleEditButton={handleEditButton}
              handleAddButton={handleAddButton}
              numSelected={numSelected}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container style={{ padding: "20px", width: "100%" }} spacing={4}>
        {viewFields.map((item, index) => {
          return (
            <Grid item xs={12} sm={5} md={4} lg={3} key={index}>
              <Typography variant="h6">{item.label}</Typography>
              <Typography>{item.value ? item.value : data[item.id]}</Typography>
            </Grid>
          );
        })}
      </Grid>
      <Grid
        container
        style={{ padding: "20px", width: "100%", justifyContent: "center" }}
        spacing={1}
      >
        {handleBack && (
          <Grid item sm={3} md={3} lg={2} onClick={handleBack}>
            <Button variant="contained">Go Back</Button>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default connect(null, null)(LayoutView);
