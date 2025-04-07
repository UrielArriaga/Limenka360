import React from "react";
import { OutputsProductsStyled } from "./styles";
import { Pagination } from "@material-ui/lab";
import { ArrowDownward, Assignment, Description } from "@material-ui/icons";
import { Button, IconButton } from "@material-ui/core";

export default function InformationBiomedical({
  dataExit,
  isFetchingExit,
  paginationDataOutput,
  handleToggleDrawer,
  handleOnClickTab,
}) {
  return (
    <OutputsProductsStyled>
      <div className="information">
        <div className="information__title">
          <Assignment className="icon" />
          <h4>Biomédica</h4>
        </div>
      </div>

      <div className="products">
        <table>
          <thead>
            <tr>
              <th>No Serie</th>
              <th>Reparado</th>
              <th>Formato de revisión</th>
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
                  <td>{item?.serialnumber ? item.serialnumber : "-"}</td>
                  <td>{item?.statusrepair ? "Si" : "No"}</td>  
                  <td>
                    {item?.reviewformatURL ? (
                      <Button
                        color="primary"
                        onClick={() => {
                          handleOnClickTab(item?.reviewformatURL)
                          // handleToggleDrawer(item?.reviewformatURL)
                        }}
                      >
                        <ArrowDownward /> <p> Descarga pdf</p>
                      </Button>
                    ) : (
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        <p>No Existe </p>
                      </td>
                    )}
                  </td>
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
