import React from "react";
import { OutputsProductsStyled } from "./styles";
import { Pagination } from "@material-ui/lab";
import { Assignment } from "@material-ui/icons";
import dayjs from "dayjs";

export default function OutputsProducts({ dataExit, isFetchingExit, paginationDataOutput }) {
  return (
    <OutputsProductsStyled>
      <div className="information">
        <div className="information__title">
          <Assignment className="icon" />
          <h4>Salidas</h4>
        </div>
      </div>

      <div className="products">
        <table>
          <thead>
            <tr>
              <th>No Serie</th>
              <th>Almacen </th>
              <th>Fecha Salida</th>
              <th>Folio Salida</th>
            </tr>
          </thead>

          <tbody>
            {isFetchingExit ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <p>Cargando....</p>
                </td>
              </tr>
            ) : dataExit?.length > 0 ? (
              dataExit?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.serialnumber ? item.serialnumber : "No Aplica"}</td>
                  <td>{item?.warehouse?.name ? item?.warehouse?.name : "No Aplica"}</td>
                  {/* <td>{item?.inventoryexit?.deliveryAt}</td> */}
                  <td> {item?.inventoryexit?.createdAt ? dayjs(item?.inventoryexit?.createdAt).format("DD-MMMM-YYYY") : "Sin salida"}</td>
                  <td>{item?.inventoryexit?.folio ? item.inventoryexit?.folio : "No Aplica"}</td>
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
        {paginationDataOutput && (
          <div className="pagination">
            <Pagination
              count={Math.ceil(paginationDataOutput.total / paginationDataOutput.limit)}
              onChange={(e, value) => paginationDataOutput.handlePage(value)}
              page={paginationDataOutput.page}
              size="small"
              color="primary"
            />
          </div>
        )}
      </div>
    </OutputsProductsStyled>
  );
}
