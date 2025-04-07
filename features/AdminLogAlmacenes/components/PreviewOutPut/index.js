import React from "react";
import { PreviewOutPutStyled } from "./styles";
import { Grid, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";

export default function PreviewOutPut({
  wareHouseSelected,
  setIsOpenPreview,
  listData,
  page,
  limit,
  handlePage,
  count,
  setWareHouseSelected,
}) {
  return (
    <PreviewOutPutStyled>
      <Grid container>
        <Grid item xs={3}>
          <div className="list">
            {listData.map(item => (
              <div
                className={item.id == wareHouseSelected.id ? "mi-div-select" : "mi-div"}
                onClick={() => setWareHouseSelected(item)}
              >
                <p className="title">{item.name}</p>
                <p>Creado el: {item.createdAt}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", padding: "2px", marginTop: "15px" }}>
            <Pagination
              color="primary"
              size="small"
              count={Math.ceil(count / limit)}
              variant="outlined"
              page={page}
              onChange={handlePage}
            />
          </div>
        </Grid>
        <Grid item xs={9}>
          <Grid container style={{ padding: "20px", backgroundColor: "#f5f7fa" }}>
            <Grid item xs={12}>
              <div style={{ backgroundColor: "#fff", borderRadius: "5px", marginBottom: "15px" }}>
                <div className="headerpreview">
                  <p className="concept">{wareHouseSelected.name}</p>
                  <div className="headerpreview__listactions">
                    <IconButton onClick={() => setIsOpenPreview()}>
                      <Close />
                    </IconButton>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} className="grid-container">
              <h4>Datos</h4>
              {wareHouseSelected ? (
                <div>
                  <p>Creado el: {wareHouseSelected.createdAt}</p>
                  <p>Total de Productos: {wareHouseSelected.totalProductos}</p>
                </div>
              ) : (
                <div>
                  {" "}
                  <p>Sin datos</p>{" "}
                </div>
              )}
            </Grid>
            <Grid item xs={6} className="grid-container">
              <h4>Dirección</h4>
              {wareHouseSelected.address ? (
                <div>
                  <p>Calle: {wareHouseSelected.address.street}</p>
                  <p>Número Exterior: {wareHouseSelected.address.ext_number}</p>
                  <p>Número Interi or: {wareHouseSelected.address.int_number}</p>
                  <p>Referencias: {wareHouseSelected.address.references}</p>
                  <p>Asentamiento: {wareHouseSelected.address.settlement}</p>
                  <p>Codigo Postal: {wareHouseSelected.address.postal?.postal_code}</p>
                  <p>Ciudad: {wareHouseSelected.address.city.name}</p>
                </div>
              ) : (
                <div>
                  {" "}
                  <p>Sin datos</p>{" "}
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PreviewOutPutStyled>
  );
}
