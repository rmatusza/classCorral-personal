import React from "react";
import Grid from "@material-ui/core/Grid";
import DashboardHeader from "./DashboardHeader";
import "./DashboardHeader.css";

export default function DashboardHeaderContainer({ props }) {
  return (
    <Grid
      container
      justify="space-evenly"
      alignItems="center"
      spacing={3}
      // className="outlined"
    >
      <DashboardHeader props={props} />
    </Grid>
  );
}
