import React from "react";
import { ReturnsProductsStyled } from "./styles";
import { Pagination } from "@material-ui/lab";
import { Assignment } from "@material-ui/icons";
import dayjs from "dayjs";

export default function ReturnsProducts({ returnsProducts, pagination }) {
  const { data, isFetchingReturn } = returnsProducts;
  return (
    <ReturnsProductsStyled>
      <div className="information">
        <div className="information__title">
          <Assignment className="icon" />
          <h4>Devoluciones</h4>
        </div>
      </div>

      <div className="products">
        <table>
          <thead>
            <tr>
              <th>No Serie</th>
              <th>Almacen </th>
              <th>Fecha de Devolucion </th>
            </tr>
          </thead>

          <tbody>
            {isFetchingReturn ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <p>Cargando....</p>
                </td>
              </tr>
            ) : data?.length > 0 ? (
              data?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.warehouseproduct?.serialnumber ? item?.warehouseproduct?.serialnumber : "No Aplica"}</td>
                  <td>{item?.warehouse?.name ? item?.warehouse?.name : "No Aplica"}</td>
                  <td>{item?.createdAt ? dayjs(item?.createdAt).format("DD,MMMM YYYY") : "No Aplica"}</td>
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
        {pagination && (
          <div className="pagination">
            <Pagination
              count={Math.ceil(pagination.total / pagination.limit)}
              onChange={(e, value) => pagination.handlePage(value)}
              page={pagination.page}
              size="small"
              color="primary"
            />
          </div>
        )}
      </div>
    </ReturnsProductsStyled>
  );
}
