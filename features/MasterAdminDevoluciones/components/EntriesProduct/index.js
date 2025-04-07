import React from "react";
import { EntriesProductUnitStyled } from "./styled";
import { Pagination } from "@material-ui/lab";

export default function EntriesProduct({ dataEntrance, isFetchingEntrance, paginationData }) {
  console.log("Data",dataEntrance);
  return (
    <EntriesProductUnitStyled>
      <div className="information">
        <div className="information__title">
          <h4>Entradas</h4>
        </div>
      </div>

      <div className="products">
        <table>
          <thead>
            <tr>
              <th>No Serie</th>
              <th>Folio</th>
            </tr>
          </thead>
          <tbody>
            {isFetchingEntrance ? (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  <p>Cargando...</p>
                </td>
              </tr>
            ) : dataEntrance?.length > 0 ? (
              dataEntrance?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.folio || "No Aplica"}</td> 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
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
              onChange={(e, value) => paginationData.handlePagination(e, value)} 
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
