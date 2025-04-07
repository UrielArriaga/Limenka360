import { Box, Grid } from "@material-ui/core";
import React from "react";
import { DataOrderStyled } from "./style";

export default function DataOrder(props) {
  const { falling, setFalling, order, setOrder, addOptions, addOptionsOrderBy, handleRefetch } = props;

  return (
    <DataOrderStyled>
      <div className="filtercomponent">
        <Grid container alignItems="center" justifyContent="flex-end" spacing={1}>
          <label className="orderBy">Ordenar por:</label>
          <div className="content-select">
            <select
              onChange={e => {
                setOrder(e.target.value);
                if (handleRefetch) {
                  handleRefetch();
                }
              }}
              value={order}
              name=""
              id=""
            >
              <option value="" hidden>
                Selecciona una Opción
              </option>
              {addOptions.map((item, index) => (
                <option key={index} value={item.value} name={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="content-select" style={{ marginLeft: 4 }}>
            <select
              onChange={e => {
                setFalling(e.target.value);
                if (handleRefetch) {
                  handleRefetch();
                }
              }}
              value={falling}
              name=""
              id=""
            >
              {addOptionsOrderBy.map((item, index) => (
                <option key={index} value={item.value} name={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </Grid>
      </div>
    </DataOrderStyled>
  );
}
