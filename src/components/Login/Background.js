import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

const Background = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://cdn.imgbin.com/12/19/9/imgbin-cargo-freight-forwarding-agency-freight-transport-logistics-shipping-assorted-transportation-miniature-5ErH6wjuZ68PLXjccpAtGLj0M.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </React.Fragment>
  );
};

export default Background;
