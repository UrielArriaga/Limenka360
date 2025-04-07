import { CircularProgress } from "@material-ui/core";
import React from "react";

export default function SearchProspectsNotFound(keyword) {
  return (
    <div className="notFound">
      <p>No hay resultados de {keyword?.keyword}. </p>
    </div>
  );
}
