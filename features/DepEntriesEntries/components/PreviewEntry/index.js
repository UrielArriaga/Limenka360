import { Grid, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import TableLimenkaGeneral from "../../../../components/TableLimenkaGeneral";
import usePreviewEntry from "../../hooks/usePreviewEntry";

export default function PreviewEntry({ entrySelected, closePreview }) {
  const { inventoryProducts, isLoading, paginationData, totalResults } = usePreviewEntry(entrySelected.id);
  return (
    <Grid container>
      <Grid item xs={3}></Grid>
      <Grid item xs={9}>
        <Grid
          container
          style={{
            padding: "15px",
            backgroundColor: "#f5f7fa",
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center ",
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h4>Folio: {entrySelected.folio}</h4>
            <IconButton onClick={() => closePreview()}>
              <Close />
            </IconButton>
          </Grid>

          <Grid
            item
            xs={12}
            style={{ backgroundColor: "#fff", padding: "10px", marginTop: "15px", borderRadius: "5px" }}
          >
            <p>Fecha de entrega: {entrySelected.deliverydate}</p>
          </Grid>

          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <TableLimenkaGeneral
              typeTable="border"
              heads={["code", "producto"]}
              data={inventoryProducts}
              rowsLoader={totalResults}
              isLoading={isLoading}
              paginationData={{
                ...paginationData,
                total: totalResults,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
