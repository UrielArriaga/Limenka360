import React from "react";
import { Snackbar, SnackbarContent } from "@material-ui/core";

const AlertGlobal = ({ severity, message, show }) => (
  <Snackbar open={show} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
    <SnackbarContent
      style={{ backgroundColor: severity === "error" ? "#f44336" : "#4caf50" }}
      message={message}
    />
  </Snackbar>
);

export default AlertGlobal;