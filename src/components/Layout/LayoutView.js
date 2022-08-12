import React from "react"
import { connect } from "react-redux"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import CustomLoader from "../CustomComponents/CustomLoader/CustomLoader"
import CustomCrudIcons from "../CustomComponents/CustomCrudIcons/CustomCrudIcons"
import styles from "./styles.module.css"

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
  children,
  print = false,
  className = "",
  downloadLoading,
  handleDownload,
  selectedFrom,
  selectedTo,
  setSelectedFrom,
  setSelectedTo,
}) => {
  if (loading) return <CustomLoader style={{ height: "80%" }} />

  return (
    <Box className={className}>
      <Box display="flex">
        <Grid container className={styles.viewHeader}>
          <Grid item xs={10} md={3}>
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
            xs={2}
            md={9}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <CustomCrudIcons
              handleDeleteAgree={handleDeleteAgree}
              handleEditButton={handleEditButton}
              handleAddButton={handleAddButton}
              numSelected={numSelected}
              print={print}
              downloadLoading={downloadLoading}
              handleDownload={handleDownload}
              setSelectedFrom={setSelectedFrom}
              setSelectedTo={setSelectedTo}
              selectedFrom={selectedFrom}
              selectedTo={selectedTo}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container style={{ padding: "20px", width: "100%" }} spacing={3}>
        {viewFields.map((item, index) => {
          return (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              key={index}
              className={styles.gridItem}
            >
              <Typography variant="h6">{item.label}</Typography>
              <Typography>{item.value ? item.value : data[item.id]}</Typography>
            </Grid>
          )
        })}
      </Grid>
      {children}
      <Grid container spacing={1} className={styles.goBack}>
        {handleBack && (
          <Grid item sm={3} md={3} lg={2} onClick={handleBack}>
            <Button variant="contained">Go Back</Button>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default connect(null, null)(LayoutView)
