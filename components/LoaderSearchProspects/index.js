import { CircularProgress } from "@material-ui/core";
import React from "react";

export default function LoaderSearchProspects() {
  return (
    <div className="loader">
      <CircularProgress />
    </div>
  );
}