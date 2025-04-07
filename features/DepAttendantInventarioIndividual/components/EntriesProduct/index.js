import { Assignment } from "@material-ui/icons";
import React from "react";
import { EntriesProductUnitStyled } from "./styled";
import { Pagination } from "@material-ui/lab";

import dayjs from "dayjs";

export default function EntriesProduct({ dataEntrance, isFetchingEntrance, paginationData }) {
  return (
    <EntriesProductUnitStyled>
      <div className="information">
        <div className="information__title">
          <Assignment className="icon" />
          <h4>Entradas</h4>
        </div>
      </div>

      <div className="products">
        <table>
          <thead>
            <tr>
              <th>No Serie</th>
              <th>Almacen</th>
              <th>Fecha Entrada</th>
            </tr>
          </thead>
          <tbody>
            {isFetchingEntrance ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <p>Cargando....</p>
                </td>
              </tr>
            ) : dataEntrance?.length > 0 ? (
              dataEntrance?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.serialnumber ? item.serialnumber : "No Aplica"}</td>
                  <td>{item?.warehouse?.name ? item?.warehouse?.name : "No Aplica"}</td>
                  <td> {dayjs(item?.warehouse?.createdAt).format("DD-MMMM-YYYY")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No hay resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {paginationData && (
          <div className="pagination">
            <Pagination
              count={Math.ceil(paginationData.total / paginationData.limit)}
              onChange={(e, value) => paginationData.handlePage(value)}
              page={paginationData.page}
              size="small"
              color="primary"
            />
          </div>
        )}
      </div>
    </EntriesProductUnitStyled>
  );
}
